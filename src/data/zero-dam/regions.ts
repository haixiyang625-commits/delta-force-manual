import type { Region } from '../../types'

export const regions: Region[] = [
  {
    id: 'admin',
    name: '行政辖区',
    description:
      '全图最富集区域。行政东西楼、集装箱区、停车场；地下金库需破壁行动。交火最激烈。',
    zone: { x: 28, y: 4, w: 44, h: 32 },
  },
  {
    id: 'cement',
    name: '水泥厂',
    description:
      '约 19 个固定物资点，主楼内集中。二层骇客电脑、航空箱为必搜点。宿舍 201 为钥匙房。',
    zone: { x: 2, y: 28, w: 26, h: 30 },
  },
  {
    id: 'barracks',
    name: '军营',
    description: '约 5 个固定物资点，产出工具材料与电子物品，适合跑刀外围。',
    zone: { x: 4, y: 58, w: 22, h: 18 },
  },
  {
    id: 'substation',
    name: '主变电站',
    description:
      '约 13 个固定物资点。主楼保险柜为高价值点，技术室需钥匙。密码门位于地下管道。',
    zone: { x: 72, y: 18, w: 26, h: 28 },
  },
  {
    id: 'visitor',
    name: '游客中心',
    description:
      '距核心区最远，约 10 个物资点。生活用品与资料为主，竞争相对较小。',
    zone: { x: 62, y: 52, w: 34, h: 28 },
  },
  {
    id: 'backup-power',
    name: '备用电站',
    description: '南部小区域，约 7 个物资点，适合落点偏南时第一站。',
    zone: { x: 38, y: 72, w: 24, h: 16 },
  },
  {
    id: 'dam-pipe',
    name: '大坝 / 管道',
    description: '坝体、地下通道与管道。地下金库、拉闸撤离相关；鸟窝与藏匿物较多。',
    zone: { x: 30, y: 36, w: 40, h: 34 },
  },
  {
    id: 'container-yard',
    name: '集装箱 / 工地',
    description: '行政外围，医疗物资堆与武器箱集中，相对开阔需注意狙击。',
    zone: { x: 18, y: 32, w: 28, h: 22 },
  },
  {
    id: 'wild',
    name: '野外 / 其他',
    description:
      '官方标注的野外、合同随机点、河道等。位置以官方坐标为准，部分为概率刷新。',
    zone: { x: 20, y: 50, w: 60, h: 40 },
  },
]

export const regionMap = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<
  string,
  Region
>
