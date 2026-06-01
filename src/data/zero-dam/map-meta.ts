export const mapMeta = {
  id: 'zero-dam',
  name: '零号大坝',
  mode: '烽火地带',
  description:
    '物资点坐标、区域与出现条件均从腾讯官方地图工具同步。支持常规 / 机密 / 绝密三种难度切换。',
  officialMapTool: 'https://df.qq.com/cp/a20240729directory/',
  beginnerTips: [
    '优先用官方地图工具对照本页坐标，赛季更新后运行 npm run import:zero-dam 同步数据。',
    '标注「随机刷新」「概率出现」的点位每局可能变化，以游戏内为准。',
    '钥匙房名称见详情中的「官方大区域」（如东楼经理室、西楼调控房）。',
    '高价值容器（保险箱、服务器、航空箱等）搜完尽快转移，少恋战。',
    '野外 / 合同类点位竞争相对分散，适合跑刀顺路。',
  ],
}
