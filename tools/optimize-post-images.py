#!/usr/bin/env python3
"""Convert new local post images to WebP without changing Markdown files."""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps, UnidentifiedImageError
except ModuleNotFoundError as error:
    raise SystemExit(
        "Missing image-tool dependency. Run: python -m pip install Pillow"
    ) from error


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_IMAGE_ROOT = ROOT / "source" / "img" / "posts"
SUPPORTED_SUFFIXES = {".bmp", ".jpeg", ".jpg", ".png", ".tif", ".tiff"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "paths",
        nargs="*",
        type=Path,
        default=[DEFAULT_IMAGE_ROOT],
        help="image files or directories (default: source/img/posts)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=90,
        choices=range(1, 101),
        metavar="1-100",
        help="WebP quality (default: 90)",
    )
    return parser.parse_args()


def discover(paths: list[Path]) -> list[Path]:
    images: set[Path] = set()
    for raw_path in paths:
        path = raw_path if raw_path.is_absolute() else ROOT / raw_path
        if path.is_dir():
            images.update(
                candidate
                for candidate in path.rglob("*")
                if candidate.is_file() and candidate.suffix.lower() in SUPPORTED_SUFFIXES
            )
        elif path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES:
            images.add(path)
        elif not path.exists():
            print(f"Not found: {path}", file=sys.stderr)
    return sorted(images)


def optimize(source: Path, quality: int) -> Path:
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        if getattr(image, "is_animated", False) and getattr(image, "n_frames", 1) > 1:
            raise ValueError("animated images retain their original format")
        image = ImageOps.exif_transpose(image)
        has_alpha = "A" in image.getbands() or "transparency" in image.info
        converted = image.convert("RGBA" if has_alpha else "RGB")
        temp_target = target.with_suffix(".tmp.webp")
        converted.save(temp_target, "WEBP", quality=quality, method=6)
        temp_target.replace(target)
    return target


def web_path(path: Path) -> str:
    source_dir = ROOT / "source"
    try:
        return "/" + path.relative_to(source_dir).as_posix()
    except ValueError:
        return path.as_posix()


def display_path(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return path.as_posix()


def main() -> int:
    args = parse_args()
    images = discover(args.paths)
    failures = 0
    for source in images:
        try:
            target = optimize(source, args.quality)
            print(f"{display_path(source)} -> {web_path(target)}")
        except (OSError, UnidentifiedImageError, ValueError) as error:
            failures += 1
            print(f"Skipped {source}: {error}", file=sys.stderr)
    print(f"Optimized {len(images) - failures} image(s); {failures} skipped")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
