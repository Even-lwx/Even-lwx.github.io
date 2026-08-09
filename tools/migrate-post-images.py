#!/usr/bin/env python3
"""Migrate the blog's legacy remote Markdown images into local WebP assets."""

from __future__ import annotations

import argparse
import io
import json
import re
import sys
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Final

try:
    import requests
    from PIL import Image, ImageOps, UnidentifiedImageError
except ModuleNotFoundError as error:
    raise SystemExit(
        "Missing image-tool dependency. Run: python -m pip install Pillow requests"
    ) from error


ROOT: Final = Path(__file__).resolve().parents[1]
POSTS_DIR: Final = ROOT / "source" / "_posts"
ASSETS_DIR: Final = ROOT / "source" / "img" / "posts"
REPORT_PATH: Final = ROOT / "reports" / "post-image-migration.json"
MAX_DOWNLOAD_BYTES: Final = 25 * 1024 * 1024
IMAGE_PATTERN: Final = re.compile(
    r"!\[[^\]]*\]\(\s*<?(?P<url>https?://[^\s)>]+)>?"
    r"(?:\s+(?:\"[^\"]*\"|'[^']*'))?\s*\)"
)
ALL_IMAGE_PATTERN: Final = re.compile(
    r"!\[[^\]]*\]\(\s*<?(?P<url>(?:https?://|/img/posts/)[^\s)>]+)>?"
    r"(?:\s+(?:\"[^\"]*\"|'[^']*'))?\s*\)"
)
POST_SLUGS: Final = {
    "24级杭电先修课PTA作业.md": "hdu-precourse-pta",
    "stm32单片机学习.md": "stm32-learning",
    "大学物理B1-期中复习.md": "college-physics-b1-midterm",
    "大学物理B1-期末复习.md": "college-physics-b1-final",
    "我的markdown学习.md": "markdown-learning",
    "我的《微电子技术和集成电路产业》学习感悟.md": "microelectronics-reflection",
    "线性代数-期末复习.md": "linear-algebra-final",
    "高等数学A1-期末复习.md": "calculus-a1-final",
    "高等数学A2-期中复习.md": "calculus-a2-midterm",
    "高等数学A2-期末复习.md": "calculus-a2-final",
}


@dataclass
class MigrationResult:
    post: str
    source_url: str | None
    local_url: str | None
    status: str
    width: int | None = None
    height: int | None = None
    source_bytes: int | None = None
    output_bytes: int | None = None
    error: str | None = None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--quality",
        type=int,
        default=90,
        choices=range(1, 101),
        metavar="1-100",
        help="WebP quality for static images (default: 90)",
    )
    return parser.parse_args()


def download(session: requests.Session, url: str) -> bytes:
    started_at = time.monotonic()
    with session.get(url, timeout=(8, 15), stream=True) as response:
        response.raise_for_status()
        content_length = int(response.headers.get("content-length", 0))
        if content_length > MAX_DOWNLOAD_BYTES:
            raise ValueError(f"download exceeds {MAX_DOWNLOAD_BYTES} bytes")
        chunks: list[bytes] = []
        size = 0
        for chunk in response.iter_content(64 * 1024):
            if not chunk:
                continue
            size += len(chunk)
            if size > MAX_DOWNLOAD_BYTES:
                raise ValueError(f"download exceeds {MAX_DOWNLOAD_BYTES} bytes")
            if time.monotonic() - started_at > 45:
                raise TimeoutError("download exceeded 45 seconds")
            chunks.append(chunk)
    return b"".join(chunks)


def convert_static_image(payload: bytes, target: Path, quality: int) -> tuple[int, int]:
    with Image.open(io.BytesIO(payload)) as image:
        image.load()
        if getattr(image, "is_animated", False) and getattr(image, "n_frames", 1) > 1:
            raise ValueError("animated image must retain its original format")

        image = ImageOps.exif_transpose(image)
        has_alpha = "A" in image.getbands() or "transparency" in image.info
        converted = image.convert("RGBA" if has_alpha else "RGB")
        target.parent.mkdir(parents=True, exist_ok=True)
        temp_target = target.with_suffix(".tmp.webp")
        converted.save(temp_target, "WEBP", quality=quality, method=6)
        temp_target.replace(target)
        return converted.size


def migrate_post(
    session: requests.Session,
    post_path: Path,
    slug: str,
    quality: int,
) -> list[MigrationResult]:
    source = post_path.read_text(encoding="utf-8")
    images = [match.group("url") for match in ALL_IMAGE_PATTERN.finditer(source)]
    results: list[MigrationResult] = []
    replacements: dict[str, str] = {}

    for index, url in enumerate(images, start=1):
        if not url.startswith(f"/img/posts/{slug}/"):
            continue
        target = ROOT / "source" / url.removeprefix("/")
        try:
            with Image.open(target) as image:
                width, height = image.size
                image.verify()
            results.append(
                MigrationResult(
                    post=post_path.name,
                    source_url=None,
                    local_url=url,
                    status="already-local",
                    width=width,
                    height=height,
                    output_bytes=target.stat().st_size,
                )
            )
        except (OSError, UnidentifiedImageError) as error:
            results.append(
                MigrationResult(
                    post=post_path.name,
                    source_url=None,
                    local_url=url,
                    status="failed",
                    error=f"invalid local image: {error}",
                )
            )

    for index, url in enumerate(images, start=1):
        if not url.startswith(('http://', 'https://')):
            continue
        target = ASSETS_DIR / slug / f"image-{index:02d}.webp"
        local_url = f"/img/posts/{slug}/{target.name}"
        try:
            if target.is_file():
                with Image.open(target) as image:
                    width, height = image.size
                    image.verify()
                source_bytes = None
                status = "reused"
            else:
                payload = download(session, url)
                width, height = convert_static_image(payload, target, quality)
                source_bytes = len(payload)
                status = "migrated"
            replacements[url] = local_url
            results.append(
                MigrationResult(
                    post=post_path.name,
                    source_url=url,
                    local_url=local_url,
                    status=status,
                    width=width,
                    height=height,
                    source_bytes=source_bytes,
                    output_bytes=target.stat().st_size,
                )
            )
        except (
            requests.RequestException,
            OSError,
            TimeoutError,
            UnidentifiedImageError,
            ValueError,
        ) as error:
            results.append(
                MigrationResult(
                    post=post_path.name,
                    source_url=url,
                    local_url=None,
                    status="failed",
                    error=str(error),
                )
            )

    if replacements:
        updated = IMAGE_PATTERN.sub(
            lambda match: match.group(0).replace(
                match.group("url"),
                replacements.get(match.group("url"), match.group("url")),
                1,
            ),
            source,
        )
        post_path.write_text(updated, encoding="utf-8", newline="\n")

    return results


def write_report(results: list[MigrationResult]) -> None:
    migrated = sum(result.status == "migrated" for result in results)
    reused = sum(result.status in {"already-local", "reused"} for result in results)
    failed = sum(result.status == "failed" for result in results)
    report = {
        "summary": {
            "discovered": len(results),
            "migrated": migrated,
            "reused": reused,
            "available_locally": migrated + reused,
            "failed": failed,
        },
        "failures": [asdict(result) for result in results if result.status == "failed"],
        "images": [asdict(result) for result in results],
    }
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def main() -> int:
    args = parse_args()
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 Chrome/127.0 Safari/537.36"
            ),
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        }
    )

    results: list[MigrationResult] = []
    for post_name, slug in POST_SLUGS.items():
        post_path = POSTS_DIR / post_name
        if not post_path.is_file():
            print(f"Missing post: {post_path}", file=sys.stderr)
            continue
        post_results = migrate_post(session, post_path, slug, args.quality)
        results.extend(post_results)
        print(f"{post_name}: {len(post_results)} image(s) checked")

    write_report(results)
    migrated = sum(result.status == "migrated" for result in results)
    reused = sum(result.status in {"already-local", "reused"} for result in results)
    failed = sum(result.status == "failed" for result in results)
    print(f"Migration complete: {migrated} migrated, {reused} reused, {failed} failed")
    print(f"Report: {REPORT_PATH.relative_to(ROOT)}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
