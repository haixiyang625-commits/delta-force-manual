# 阿里云 OSS 部署（国内线路）

与 **Vercel（海外）** 配合：国内用户访问 OSS 地址，海外用户访问 Vercel 地址。

---

## 一、开通与领取免费额度

1. 注册 [阿里云](https://www.aliyun.com/) 并完成 **实名认证**
2. 搜索 **对象存储 OSS**，进入控制台
3. 若未开通过 OSS，在 [免费试用](https://www.aliyun.com/product/oss) 领取新用户额度（约 **20GB 存储 / 3 个月**、**2GB 外网流量 / 3 个月** 等，以页面为准）

建议在 **费用中心** 设置 **消费告警**（如月账单 &gt; 20 元提醒）。

---

## 二、创建存储桶

1. OSS 控制台 → **Bucket 列表** → **创建 Bucket**
2. 建议配置：
   - **地域**：华东 1（杭州）或离用户近的国内地域
   - **存储类型**：标准存储
   - **读写权限**：**公共读**（静态网站必须能让访客读文件）
   - **版本控制**：关闭（个人站够用）
3. 创建完成后进入该 Bucket

---

## 三、开启静态网站

1. 左侧 **数据管理** → **静态页面**
2. **开通** 静态网站托管
3. 默认首页：`index.html`
4. 默认 404 页：`index.html`
5. **错误文档响应码**：选 **200**（单页应用刷新不 404；若只有 404 选项，选 404 也可先试）
6. 子目录首页：**不开通**
5. 点击 **设置** 保存后，本页可能 **没有**「访问端点」一行（新版控制台已简化），属正常。

**域名在哪里看？**

- 左侧点 **概览**，在「访问端口」/「Bucket 域名」里复制 **外网访问** 域名。  
- 你的 Bucket 在成都，格式一般为：

  `http://delta-force-manual.oss-cn-chengdu.aliyuncs.com`

  访问网站根目录请用 **带末尾斜杠** 的地址（不要带 `/index.html`）：

  `http://delta-force-manual.oss-cn-chengdu.aliyuncs.com/`

**不要用**：文件管理 → 某个文件 → 详情 → 复制 URL（那是对象直链，会触发下载）。

### 重要：默认 `*.aliyuncs.com` 会强制下载

阿里云官方说明：用 **Bucket 默认域名** 访问 HTML 时，浏览器会 **下载文件而不是打开网页**（响应头带 `Content-Disposition: attachment`）。

你在文件详情里看到的：

`https://delta-force-manual.oss-cn-chengdu.aliyuncs.com/index.html`

属于 **对象直链**，不能当作网站首页发给用户。

**要让国内用户正常在浏览器里打开站点，必须：**

1. 准备一个 **已备案** 的域名（Bucket 在成都等中国内地，域名需 ICP 备案）
2. Bucket → **传输管理** → **域名管理** → **绑定自定义域名**
3. 在域名服务商添加控制台给出的 **CNAME** 记录
4. 用 `https://你的域名` 访问，并写入 `VITE_SITE_CN`

备案入口：阿里云 **ICP 备案** 控制台，个人站一般 1～2 周。

> 无备案域名时，OSS 默认域名 **无法** 作为可分享的「网站链接」，只能作存储；海外线路继续用 Vercel 即可。

---

## 四、开放公共读（解决 AccessDenied）

若浏览器打开 Bucket 地址出现 XML：`AccessDenied` / `You do not have read permission on this object`，说明访客没有读权限。按顺序操作：

### 1. 关闭「阻止公共访问」

1. Bucket 左侧 **权限控制** → **阻止公共访问**
2. 若开关为 **已开启**，点击关闭
3. 弹窗输入：`我确认关闭阻止公共访问` → **确定**

### 2. 设置 Bucket 为公共读

1. **权限控制** → **读写权限** → **设置**
2. **Bucket ACL** 选 **公共读**
3. 若有风险提示，点 **继续修改** → **保存**

### 3. 确认文件在根目录

**文件管理** → **文件列表** 根目录下应有 `index.html` 和 `assets/` 文件夹（不是套在 `dist/` 文件夹里）。

### 4. 再访问

先试：

`http://delta-force-manual.oss-cn-chengdu.aliyuncs.com/`

（建议先用 **http**，默认域名 HTTPS 有时与静态站表现不一致。）

> 权限修好后，若仍 **下载** HTML 而不是打开网页，仍是默认域名策略，需 **备案 + 自定义域名**（见上文）。

---

## 五、上传网站文件

### 本地构建

```bash
cd /Users/yhx/Desktop/work/my-project/delta-force-manual
npm install
npm run build
```

`dist/` 目录即为要上传的全部内容。

### 控制台上传

1. Bucket → **文件管理** → **上传文件**
2. 选择 `dist` 内 **所有文件和文件夹**（含 `index.html`、`assets/`）
3. 上传到 Bucket **根目录**（不要多包一层 `dist` 文件夹）

### 命令行上传（可选，已安装 ossutil）

```bash
ossutil cp -r dist/ oss://你的bucket名称/ --update
```

---

## 六、验证

- **已绑定备案域名**：浏览器打开 `https://你的域名`，应能看到地图页。
- **仅默认 aliyuncs.com**：点击后可能 **下载 index.html**，属正常现象，不代表没部署成功。

---

## 七、配置站点上的「双线路」链接

部署完成后，把国内地址写入环境变量，与 Vercel 一起构建进页面：

1. 复制项目中的 `.env.example` 为 `.env.production`：

```bash
cp .env.example .env.production
```

2. 编辑 `.env.production`：

```env
VITE_SITE_CN=https://你的bucket.oss-cn-hangzhou.aliyuncs.com
VITE_SITE_INTL=https://你的项目.vercel.app
```

3. 重新构建并上传 OSS：

```bash
npm run build
# 再次上传 dist/ 到 Bucket
```

在 **Vercel** 项目 → **Settings → Environment Variables** 里添加同样的 `VITE_SITE_CN`、`VITE_SITE_INTL`，然后 **Redeploy**，海外站页头也会显示两条线路。

---

## 八、日常更新流程

```bash
# 1. 改代码、提交
git add .
git commit -m "更新说明"
git push origin main          # 自动更新 Vercel（海外）

# 2. 国内线路
npm run build
# 上传 dist/ 到 OSS（控制台或 ossutil）
```

若只改了官方数据：

```bash
npm run import:zero-dam
npm run build
# 再上传 dist/
```

---

## 九、费用提醒

- 新用户试用期内：存储与少量流量通常 **0～几元**
- 试用结束后：主要按 **外网流出流量** 计费（约 **0.25～0.5 元/GB**），小站一般 **每月几元以内**
- 详见 [新用户免费试用](https://help.aliyun.com/zh/oss/free-quota-for-new-users) 与 [OSS 定价](https://www.aliyun.com/price/detail/oss)
