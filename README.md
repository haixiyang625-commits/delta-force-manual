# 三角洲行动 · 新手手册

帮助新手更快上手《三角洲行动》烽火地带模式。当前版本：**零号大坝**物资点，数据来自腾讯官方地图工具。

## 线上访问（双线路）

| 线路 | 平台 | 适合 |
|------|------|------|
| **国内** | 阿里云 OSS | 中国大陆用户 |
| **海外** | Vercel | 海外或可直接访问 Vercel 的用户 |

- 国内部署步骤 → **[docs/deploy-aliyun.md](docs/deploy-aliyun.md)**  
- 总览 → **[docs/deploy-china.md](docs/deploy-china.md)**  
- 页头「国内 / 海外」按钮：在 `.env.production` 或 Vercel 环境变量中配置 `VITE_SITE_CN`、`VITE_SITE_INTL`（见 [.env.example](.env.example)）

## 数据可靠性

| 项目 | 说明 |
|------|------|
| 来源 | [官方地图工具](https://df.qq.com/cp/a20240729directory/) 的 `map_article.js` |
| 坐标 | 官方游戏 X/Y/Z，页面内映射为 0–100% 显示 |
| 出现条件 | 官方字段原文（如「随机刷新」「概率出现」） |
| 难度 | 常规 351 点 / 机密 363 点 / 绝密 380 点（仅物资容器） |

赛季更新后执行 `npm run import:zero-dam` 并重新部署两处托管。

## 开发

```bash
npm install
npm run dev
```

### 同步官方数据

```bash
npm run import:zero-dam
```

## 构建

```bash
npm run build
npm run preview
```

## 部署与更新

### 海外（Vercel，自动）

```bash
git push origin main
```

GitHub 已连接 Vercel 时，推送即自动构建。

### 国内（阿里云 OSS，手动上传）

```bash
npm run build
# 将 dist/ 内全部文件上传到 OSS Bucket 根目录
```

详见 [docs/deploy-aliyun.md](docs/deploy-aliyun.md)。

### 环境变量（双线路链接）

```bash
cp .env.example .env.production
# 填写 VITE_SITE_CN、VITE_SITE_INTL 后
npm run build
```

Vercel：**Settings → Environment Variables** 添加相同变量并 Redeploy。

## 免责声明

玩家攻略向整理。游戏数据以游戏内及腾讯官方公告为准。
