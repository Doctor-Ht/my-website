# 网页布置 Skill

> 稻听途说 网站内容创建、页面布局、CMS部署一站式管理

## 项目信息

- **本地路径**: `D:\my-website`
- **GitHub**: `https://github.com/Doctor-Ht/my-website`
- **线上地址**: `https://my-website-delta-umber-26.vercel.app`
- **CMS后台**: `https://my-website-delta-umber-26.vercel.app/admin`
- **技术栈**: Next.js 16 + MDX + Tailwind CSS v4 + Decap CMS 3.6.2

---

## 一、创建新文章

### 1.1 第一步：确认内容和分区

根据内容类型，选择对应的分区和目录：

| 分区 | 路由 | 目录 | 主题色 |
|------|------|------|--------|
| 随笔杂记 | `/essays` | `content/essays/` | amber `#d97706` |
| 生物学笔记 | `/biology` | `content/biology/` | emerald `#059669` |
| 读书笔记 | `/reading` | `content/reading/` | indigo `#6366f1` |

### 1.2 第二步：创建 MDX 文件

在对应 `content/<section>/` 目录下创建 `.mdx` 文件，文件名格式：`YYYY-MM-DD-slug.mdx`

**前端元数据模板**：

```yaml
---
title: "文章标题"
date: "2026-06-26"
description: "文章摘要描述，用于卡片预览和SEO"
tags: ["标签1", "标签2"]
---

文章正文从这开始……
```

### 1.3 第三步：在文章中使用自定义 MDX 组件

| 组件 | 用法 | 适用场景 |
|------|------|---------|
| `Callout` | `<Callout type="info">内容</Callout>` | 提示框，type: `info` / `warning` / `tip` / `important` |
| `DefinitionBox` | `<DefinitionBox term="术语">定义解释</DefinitionBox>` | 术语定义框 |
| `ConceptCard` | `<ConceptCard title="概念名" icon="🧬">解释</ConceptCard>` | 知识概念卡片 |

**Callout 示例**：
```mdx
<Callout type="info">
  这是一个信息提示，用于补充说明。
</Callout>

<Callout type="warning">
  注意：这里有一个重要的注意事项。
</Callout>

<Callout type="tip">
  💡 小技巧：使用 `Cmd+K` 可以快速搜索全站文章。
</Callout>

<Callout type="important">
  ⚠️ 关键概念：光合作用是生物体将光能转化为化学能的过程。
</Callout>
```

**生物学文章额外内容**：如果是生物学文章，元数据中需要添加子主题信息：
```yaml
---
title: "DNA复制过程"
date: "2026-06-26"
description: "详细讲解DNA半保留复制的分子机制"
tags: ["分子生物学", "DNA"]
topic: "分子生物学"        # 主分类
subtopic: "dna-replication"  # 子主题标识
---
```

### 1.4 第四步：本地预览

```bash
cd D:/my-website
npm run dev
```

浏览器打开 `http://localhost:3000/<section>/<slug>` 预览文章效果。

---

## 二、页面布局设计

### 2.1 可用布局组件

| 组件 | 路径 | 用途 |
|------|------|------|
| `Hero` | `components/Hero.tsx` | 首页/分区页的全屏大标题 |
| `ContentCard` | `components/ContentCard.tsx` | 首页分区入口卡片 (3列网格) |
| `ArticleCard` | `components/ArticleCard.tsx` | 文章列表卡片 |
| `CardTilt` | `components/CardTilt.tsx` | 鼠标悬停3D倾斜效果 |
| `ScrollReveal` | `components/ScrollReveal.tsx` | 滚动渐入动画 |
| `ScrollProgress` | `components/ScrollProgress.tsx` | 全局滚动进度条 |
| `ArticleProgress` | `components/ArticleProgress.tsx` | 单篇文章阅读进度 |
| `CursorGlow` | `components/CursorGlow.tsx` | 鼠标光标光晕 |
| `TableOfContents` | `components/TableOfContents.tsx` | 文章目录侧栏 |
| `SearchDialog` | `components/SearchDialog.tsx` | Cmd+K 全文搜索弹窗 |
| `BackToTop` | `components/BackToTop.tsx` | 回到顶部按钮 |
| `BiologySidebar` | `components/BiologySidebar.tsx` | 生物学知识体系侧栏 |
| `BiologyCard` | `components/BiologyCard.tsx` | 带图标的分区文章卡片 |

### 2.2 设计令牌（Design Tokens）

所有页面使用 Apple 风格设计令牌：

- **玻璃导航**: `backdrop-blur-xl bg-white/80 dark:bg-neutral-950/80`
- **卡片样式**: `card-apple` class — 圆角、微阴影、悬停抬起
- **分区强调色**: 通过 `data-section` 属性控制
  - Essays: amber `#d97706`
  - Biology: emerald `#059669`
  - Reading: indigo `#6366f1`
- **渐变色标题**: 每个分区页面标题使用对应的渐变色
- **字体**: 系统默认字体栈，中文正文使用系统中文默认字体

### 2.3 页面模板结构

**分区列表页模板** (如 `/essays`)：
```
Hero（分区名称 + 渐变色标题）
└── ArticleCard 网格列表
    ├── 每个卡片: ScrollReveal + CardTilt + ArticleCard
    └── 文章标题、日期、摘要、标签
```

**文章详情页模板**：
```
ScrollProgress（页面顶部 2px 色条）
├── 文章标题 + 元数据（日期、标签）
├── ArticleProgress（左下角阅读进度）
├── TableOfContents（桌面端右侧粘性目录）
├── 正文内容（MDX 渲染）
│   ├── 段落（首字下沉 drop-cap）
│   ├── Callout / DefinitionBox / ConceptCard
│   └── 代码块、图片等
└── BackToTop（右下角浮动按钮）
```

### 2.4 调整布局的常见操作

- **修改分区页外观**：编辑 `app/(posts)/<section>/page.tsx`
- **修改文章详情页**：编辑 `app/(posts)/<section>/[slug]/page.tsx`
- **添加新的全局组件**：在 `components/` 创建组件，在 `AppShell.tsx` 中引入
- **调整样式**：全局样式在 `app/globals.css`，组件使用 Tailwind v4 类名

---

## 三、CMS 管理

### 3.1 CMS 登录

1. 打开 `https://my-website-delta-umber-26.vercel.app/admin`
2. 点击 "Login with GitHub"
3. 授权 GitHub OAuth App
4. 登录成功后进入 Decap CMS 后台

### 3.2 CMS 故障排查（上次未完成的关键修复）

**问题：CMS postMessage 握手失败**

关键修复点 —— Decap CMS 的 GitHub OAuth 回调使用两步 postMessage 握手：
1. 回调页面发送 `"authorizing:github"` 到 opener
2. CMS 通过 postMessage 响应
3. 回调发送 `"authorization:github:success:{token,provider}"` (JSON 字符串化后包裹在冒号格式中)

**需要验证的环境变量（Vercel）**：
- `GITHUB_CLIENT_ID` — GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET` — GitHub OAuth App Client Secret
- `OAUTH_REDIRECT_URI` — `https://my-website-delta-umber-26.vercel.app/api/auth/callback`

**CMS 配置检查**：查看 `public/admin/config.yml` 中的 backend 配置是否正确。

### 3.3 CMS 使用

- **创建文章**：左侧菜单选择 Collection → 点击 "New Post"
- **编辑文章**：点击已有文章 → 修改内容 → 保存
- **发布**：保存后 CMS 自动 commit 到 GitHub → Vercel 自动部署
- **上传图片**：编辑器支持拖拽上传

---

## 四、部署流程

### 4.1 自动部署（推荐）

```bash
cd D:/my-website
git add .
git commit -m "feat: 添加新文章 - <文章标题>"
git push origin main
```

推送后 Vercel 自动检测并部署，完成后访问 `https://my-website-delta-umber-26.vercel.app` 查看。

### 4.2 手动部署

也可以通过 Vercel CLI 手动部署：
```bash
npx vercel --prod
```

### 4.3 部署后检查清单

- [ ] 首页能正常显示新文章卡片
- [ ] 分区页列表包含新文章
- [ ] 文章详情页渲染正常
- [ ] TOC 目录正确生成
- [ ] 暗色模式切换正常
- [ ] 移动端响应式正常
- [ ] 搜索能搜到新文章（需等待索引缓存更新）

---

## 五、快速参考

### 常用命令

```bash
# 本地开发
cd D:/my-website && npm run dev

# 构建检查
npm run build

# Git 提交并推送
git add . && git commit -m "..." && git push origin main

# 查看 Vercel 部署状态
npx vercel ls
```

### 关键文件速查

| 用途 | 路径 |
|------|------|
| 文章内容 | `content/<section>/` |
| 页面路由 | `app/(posts)/<section>/` |
| 全局布局 | `app/layout.tsx` |
| 组件库 | `components/` |
| 工具函数 | `lib/posts.ts` |
| 全局样式 | `app/globals.css` |
| Next.js 配置 | `next.config.ts` |
| CMS 配置 | `public/admin/config.yml` |

---

## 工作流程

当用户请求「创建新文章」时：
1. 确认内容类型（essays / biology / reading）
2. 创建 MDX 文件，填入元数据
3. 询问用户是否需要自定义 MDX 组件（Callout、DefinitionBox 等）
4. 如需本地预览，运行 `npm run dev`
5. 确认无误后，提示用户 commit & push

当用户请求「调整布局」时：
1. 明确要修改的页面（首页 / 分区页 / 文章页）
2. 使用上述组件表中的组件进行组合
3. 保持 Apple 风格设计令牌一致
4. 本地预览确认效果

当用户请求「CMS 问题」时：
1. 检查 `public/admin/config.yml` 配置
2. 检查 Vercel 环境变量是否完整
3. 测试 CMS 登录 → `/admin` → GitHub 授权流程
4. 查看浏览器控制台 postMessage 日志排查握手问题

当用户请求「部署」时：
1. 确认所有更改已保存
2. 生成清晰的 commit message
3. `git push origin main` → Vercel 自动部署
4. 等待部署完成后进行检查清单验证
