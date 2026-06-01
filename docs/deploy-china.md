# 国内 / 海外双线路部署

## 推荐架构

| 用户 | 平台 | 更新方式 |
|------|------|----------|
| **国内** | [阿里云 OSS 静态网站](deploy-aliyun.md) | 本地 `npm run build` 后上传 `dist/` |
| **海外** | [Vercel](https://vercel.com) + GitHub | `git push` 自动部署 |

Vercel 的 `*.vercel.app` 在国内常无法访问，**不要只发 Vercel 链接给国内朋友**。

码云 Gitee Pages 个人服务已长期暂停，不作为首选。

---

## 快速链接

- 阿里云 OSS 逐步操作 → **[deploy-aliyun.md](deploy-aliyun.md)**
- 环境变量（页头显示国内/海外入口）→ 项目根目录 **`.env.example`**

---

## 环境变量

构建前配置（Vercel 在控制台 Environment Variables 里填同样键名）：

| 变量 | 说明 |
|------|------|
| `VITE_SITE_CN` | 国内 OSS 静态网站地址 |
| `VITE_SITE_INTL` | 海外 Vercel 地址 |

两处部署使用**同一份代码**、**同一套** `npm run build` 产物；仅托管位置不同。
