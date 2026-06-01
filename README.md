# 三角洲行动 · 新手手册

帮助新手更快上手《三角洲行动》烽火地带模式。当前版本：**零号大坝**物资点，数据来自腾讯官方地图工具。

## 数据可靠性

| 项目 | 说明 |
|------|------|
| 来源 | [官方地图工具](https://df.qq.com/cp/a20240729directory/) 的 `map_article.js` |
| 坐标 | 官方游戏 X/Y/Z，页面内映射为 0–100% 显示 |
| 出现条件 | 官方字段原文（如「随机刷新」「概率出现」） |
| 难度 | 常规 351 点 / 机密 363 点 / 绝密 380 点（仅物资容器） |

**不包含**自编网格假点。赛季更新后请重新导入。

## 开发

```bash
npm install
npm run dev
```

### 同步官方数据

```bash
npm run import:zero-dam
```

会下载官方 `map_article.js`、`daba_floor.js`（若本地不存在），并生成 `src/data/zero-dam/official-points.json`。

## 构建

```bash
npm run build
npm run preview
```

构建产物在 `dist/` 目录，可部署到任意静态网站托管。

## 部署（让别人通过网址访问）

推荐 **GitHub + Vercel**（免费 HTTPS、自动更新、国内一般可访问）。

### 1. 推到 GitHub

```bash
cd /Users/yhx/Desktop/work/my-project/delta-force-manual
git init
git add .
git commit -m "初始版本：零号大坝官方物资地图"
```

在 GitHub 新建空仓库（不要勾选 README），然后：

```bash
git remote add origin https://github.com/你的用户名/delta-force-manual.git
git branch -M main
git push -u origin main
```

### 2. 用 Vercel 发布

1. 打开 [https://vercel.com](https://vercel.com)，用 GitHub 登录  
2. **Add New → Project**，导入刚推送的仓库  
3. 保持默认：Build Command `npm run build`，Output Directory `dist`  
4. 点 **Deploy**，约 1–2 分钟后会得到地址，形如 `https://delta-force-manual.vercel.app`

之后每次 `git push`，网站会自动重新构建。

### 其他平台（任选）

| 平台 | 构建命令 | 输出目录 |
|------|----------|----------|
| [Cloudflare Pages](https://pages.cloudflare.com) | `npm run build` | `dist` |
| [Netlify](https://www.netlify.com) | `npm run build` | `dist` |
| GitHub Pages | 见下方说明 | `dist` |

**自定义域名**：在 Vercel / Cloudflare 项目设置里添加你的域名，按提示配置 DNS 即可。

**GitHub Pages**（仓库子路径 `https://用户名.github.io/仓库名/`）需在 `vite.config.ts` 设置 `base: '/仓库名/'` 后再构建；根域名部署则不需要。

## 免责声明

玩家攻略向整理。游戏数据以游戏内及腾讯官方公告为准。
