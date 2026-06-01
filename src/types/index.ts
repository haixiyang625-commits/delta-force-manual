export type RegionId =
  | 'admin'
  | 'barracks'
  | 'cement'
  | 'substation'
  | 'visitor'
  | 'backup-power'
  | 'dam-pipe'
  | 'container-yard'
  | 'wild'

export type DataSource = 'official'

export type MapDifficulty = '常规' | '机密' | '绝密'

export type LootType =
  | 'safe'
  | 'small-safe'
  | 'server'
  | 'computer'
  | 'pc-case'
  | 'weapon-box'
  | 'large-weapon-box'
  | 'ammo-box'
  | 'tool-cabinet'
  | 'storage-box'
  | 'clothes'
  | 'medical-kit'
  | 'medical-pile'
  | 'travel-bag'
  | 'briefcase'
  | 'locker'
  | 'advanced-storage'
  | 'drawer'
  | 'hiking-bag'
  | 'express-box'
  | 'air-cargo'
  | 'trash'
  | 'mixer-truck'
  | 'field-crate'
  | 'bird-nest'
  | 'hidden-stash'
  | 'premium-travel'
  | 'gold-coins'
  | 'keycard'

export interface Region {
  id: RegionId
  name: string
  description: string
  zone: { x: number; y: number; w: number; h: number }
}

export interface LootTypeMeta {
  id: LootType
  label: string
  color: string
  defaultProbability: string
  defaultLoot: string
}

export interface LootPoint {
  id: string
  name: string
  regionId: RegionId
  type: LootType
  /** 由官方游戏坐标映射的显示位置 0–100% */
  x: number
  y: number
  gameX: number
  gameY: number
  gameZ?: number
  officialArea: string
  customArea?: string
  difficulty: MapDifficulty[]
  probability: string
  loot: string
  spawnCondition?: string
  randomNote?: string
  scatter?: boolean
  source: DataSource
  sourceUrl: string
  sourceFetchedAt: string
  tips?: string
}

export interface OfficialPointsBundle {
  mapId: string
  mapName: string
  dataSource: {
    name: string
    url: string
    files: string[]
    note: string
  }
  coordinateNote: string
  bounds: { minX: number; maxX: number; minY: number; maxY: number }
  counts: Record<MapDifficulty, number>
  difficulties: Record<MapDifficulty, LootPoint[]>
}
