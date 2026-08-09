# 文章图片工具

首次使用前安装依赖：

```powershell
python -m pip install -r "tools/requirements-images.txt"
```

将计划内文章的外链图片迁移到 `source/img/posts/`：

```powershell
npm run images:migrate
```

迁移成功后才会改写对应 Markdown；下载失败时保留原引用，并将原因写入
`reports/post-image-migration.json`。

将 `source/img/posts/` 中新增的 PNG、JPEG 等静态图片转换为 WebP：

```powershell
npm run images:optimize
```

也可以在命令后传入单个文件或目录。工具只生成 WebP，不会改写 Markdown 或删除原图。
