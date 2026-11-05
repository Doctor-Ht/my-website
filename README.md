# 稻听途说

一个以阅读、生物学笔记和随笔为主的个人网站。文章以 MDX 保存，和站点代码一起由 Git 管理。站点提供站内搜索、文章目录和深浅两种主题。

[访问网站](https://my-website-delta-umber-26.vercel.app) · [阅读免疫检查点综述解读](https://my-website-delta-umber-26.vercel.app/biology/immune-checkpoint-review)

## 本地运行

需要 Node.js 20.9 或更高版本。

```bash
npm ci
npm run dev
```

打开 [本地首页](http://localhost:3000)。使用 `npm run lint` 检查源码，使用 `npm run build` 构建生产版本。

## 内容与代码

| 路径 | 用途 |
| --- | --- |
| `content/essays/` | 随笔 |
| `content/biology/` | 生物学笔记与论文解读 |
| `content/reading/` | 读书笔记与书评 |
| `app/` | Next.js App Router 页面和 API |
| `components/mdx/` | 文章内的图表、概念卡片和提示框 |

把 `.mdx` 文件放进相应栏目，并在文件开头填写 `title`、`date` 和 `description`。可以参考[现有的生物学笔记](content/biology/immune-checkpoint-review.mdx)中的文章结构和元数据。

## 技术栈

Next.js App Router、TypeScript、Tailwind CSS 和 MDX。网站部署在 Vercel，内容也可以通过 Decap CMS 编辑。启用 CMS 的 GitHub 登录需要配置 `GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET` 和 `OAUTH_REDIRECT_URI`。
