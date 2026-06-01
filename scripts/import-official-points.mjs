/**
 * 从腾讯官方地图工具数据（map_article.js）导入零号大坝物资点。
 * 数据源：https://game.gtimg.cn/images/dfm/cp/a20240729directory/js/lib/map_article.js
 *
 * 运行：node scripts/import-official-points.mjs
 * 需先存在 scripts/map_article.js 与 scripts/daba_floor.js（脚本可自动下载）。
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SCRIPTS = __dirname
const OUT = join(ROOT, 'src/data/zero-dam/official-points.json')

const SOURCES = {
  map_article:
    'https://game.gtimg.cn/images/dfm/cp/a20240729directory/js/lib/map_article.js',
  daba_floor:
    'https://game.gtimg.cn/images/dfm/cp/a20240729directory/js/lib/daba_floor.js',
}

const LOOT_NAMES = new Set([
  '保险箱',
  '小保险箱',
  '服务器',
  '电脑',
  '电脑机箱',
  '武器箱',
  '大武器箱',
  '弹药箱',
  '工具柜',
  '收纳盒',
  '一件衣服',
  '军用医疗包',
  '医疗物资堆',
  '旅行包',
  '手提箱',
  '储物柜',
  '高级储物箱',
  '抽屉柜',
  '登山包',
  '快递箱',
  '航空储物箱',
  '垃圾桶',
  '搅拌车',
  '野外物资箱',
  '鸟窝',
  '藏匿物',
  '高级旅行箱',
  '金币堆',
  '通用房卡',
])

const ICON_TO_TYPE = {
  bxx: 'safe',
  xbxx: 'small-safe',
  fwq: 'server',
  dn: 'computer',
  dnjx: 'pc-case',
  wqx: 'weapon-box',
  dwqx: 'large-weapon-box',
  dyx: 'ammo-box',
  gjg: 'tool-cabinet',
  dgjx: 'storage-box',
  yf: 'clothes',
  ylb: 'medical-kit',
  ylwzd: 'medical-pile',
  lxd: 'travel-bag',
  stx: 'briefcase',
  cwg: 'locker',
  gjcwx: 'advanced-storage',
  ctg: 'drawer',
  dsb: 'hiking-bag',
  kdx: 'express-box',
  hkcwx: 'air-cargo',
  ljx: 'trash',
  snc: 'mixer-truck',
  ywwzx: 'field-crate',
  nw: 'bird-nest',
  cnw: 'hidden-stash',
  xlx: 'premium-travel',
  jbd: 'gold-coins',
  tyfk: 'keycard',
}

const DIFFICULTY_ARTICLES = {
  常规: 'mapArticle',
  机密: 'mapArticle2',
  绝密: 'mapArticle3',
}

async function ensureSources() {
  mkdirSync(SCRIPTS, { recursive: true })
  for (const [name, url] of Object.entries(SOURCES)) {
    const path = join(SCRIPTS, `${name}.js`)
    try {
      readFileSync(path)
    } catch {
      console.log(`下载 ${name}.js …`)
      const res = await fetch(url)
      if (!res.ok) throw new Error(`下载失败 ${url}: ${res.status}`)
      writeFileSync(path, await res.text())
    }
  }
}

function loadOfficialContext() {
  const ctx = {}
  vm.runInNewContext(readFileSync(join(SCRIPTS, 'daba_floor.js'), 'utf8'), ctx)
  vm.runInNewContext(readFileSync(join(SCRIPTS, 'map_article.js'), 'utf8'), ctx)
  return ctx
}

function mapRegionId(大区域) {
  const r = String(大区域 || '')
  if (/行政|东楼|西楼|贵宾|设备领用|售票办公室/.test(r)) return 'admin'
  if (/水泥厂/.test(r)) return 'cement'
  if (/军营/.test(r)) return 'barracks'
  if (/变电站/.test(r)) return 'substation'
  if (/游客/.test(r)) return 'visitor'
  if (/地下|大坝内部|管道/.test(r)) return 'dam-pipe'
  if (/河道|小变电站/.test(r)) return 'backup-power'
  if (/外围|集装箱|工地/.test(r)) return 'container-yard'
  if (/野外|合同|河道/.test(r)) return 'wild'
  return 'wild'
}

function buildProbability(row) {
  const parts = []
  if (row['出现条件']) parts.push(row['出现条件'])
  if (row['随机']) parts.push(row['随机'])
  if (row['是否为散点'] === 'TRUE') parts.push('散点')
  if (row['拾取条件']) parts.push(`拾取：${row['拾取条件']}`)
  return parts.filter(Boolean).join('；') || '固定刷新（以游戏内为准）'
}

function toDisplayName(row) {
  const zone = row['自定义区域']
  const area = row['大区域']
  if (zone && zone !== area && !zone.includes('每局游戏随机')) {
    return `${area} · ${row.name}`
  }
  if (zone && zone.includes('每局游戏随机')) {
    return `${row.name}（${area}，可能随机位置）`
  }
  return `${area} · ${row.name}`
}

function computeBounds(points) {
  const xs = points.map((p) => p.gameX)
  const ys = points.map((p) => p.gameY)
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  }
}

function toPercent(x, y, bounds) {
  const px =
    ((x - bounds.minX) / (bounds.maxX - bounds.minX)) * 100
  // 游戏 Y 轴向上为负，地图显示上北下南：y 越小越靠北
  const py =
    ((y - bounds.minY) / (bounds.maxY - bounds.minY)) * 100
  return {
    x: Math.round(px * 100) / 100,
    y: Math.round(py * 100) / 100,
  }
}

function convertArticle(article, difficulty) {
  const loot = article.filter((row) => LOOT_NAMES.has(row.name))
  const raw = loot.map((row, index) => {
    const type = ICON_TO_TYPE[row.icon]
    if (!type) {
      throw new Error(`未知 icon: ${row.icon} (${row.name})`)
    }
    return {
      id: `official-${difficulty}-${row.icon}-${index}`,
      name: toDisplayName(row),
      regionId: mapRegionId(row['大区域']),
      officialArea: row['大区域'],
      customArea: row['自定义区域'] || undefined,
      type,
      gameX: Number(row.x),
      gameY: Number(row.y),
      gameZ: row['z坐标'] ? Number(row['z坐标']) : undefined,
      difficulty: [difficulty],
      spawnCondition: row['出现条件'] || undefined,
      randomNote: row['随机'] || undefined,
      scatter: row['是否为散点'] === 'TRUE',
      probability: buildProbability(row),
      loot: row.name,
      source: 'official',
      sourceUrl:
        'https://df.qq.com/cp/a20240729directory/',
      sourceFetchedAt: new Date().toISOString().slice(0, 10),
    }
  })

  const bounds = computeBounds(raw)
  return raw.map((p) => {
    const { x, y } = toPercent(p.gameX, p.gameY, bounds)
    return { ...p, x, y }
  })
}

async function main() {
  await ensureSources()
  const ctx = loadOfficialContext()

  const difficulties = {}
  const counts = {}

  for (const [difficulty, key] of Object.entries(DIFFICULTY_ARTICLES)) {
    const article = ctx[key]
    if (!article?.length) throw new Error(`缺少 ${key}`)
    difficulties[difficulty] = convertArticle(article, difficulty)
    counts[difficulty] = difficulties[difficulty].length
  }

  const bounds = computeBounds(difficulties['常规'])

  const output = {
    mapId: 'zero-dam',
    mapName: '零号大坝',
    dataSource: {
      name: '腾讯《三角洲行动》官方地图工具',
      url: 'https://df.qq.com/cp/a20240729directory/',
      files: Object.values(SOURCES),
      note: '坐标与出现条件来自官方 map_article.js；概率描述为官方字段原文汇总，非解包数值。',
    },
    coordinateNote:
      'x/y 为根据官方游戏坐标线性映射到 0–100% 的显示位置，与官方 Leaflet 地图一致对齐。',
    bounds,
    counts,
    difficulties,
  }

  writeFileSync(OUT, JSON.stringify(output, null, 2))
  console.log('已写入', OUT)
  console.log('各难度物资点数:', counts)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
