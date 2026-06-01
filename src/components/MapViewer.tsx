import { useMemo } from 'react'
import type { LootPoint, LootType, RegionId } from '../types'
import { MapSchematic } from './MapSchematic'
import { LootMarker } from './LootMarker'
import { regions } from '../data/zero-dam/regions'

interface Props {
  points: LootPoint[]
  selectedId: string | null
  highlightRegion: RegionId | 'all'
  onSelect: (id: string) => void
  coordinateNote: string
}

export function MapViewer({
  points,
  selectedId,
  highlightRegion,
  onSelect,
  coordinateNote,
}: Props) {
  const typeCounts = useMemo(() => {
    const m = new Map<LootType, number>()
    for (const p of points) {
      m.set(p.type, (m.get(p.type) ?? 0) + 1)
    }
    return m
  }, [points])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8b949e]">
        <span>
          当前显示 <strong className="text-[#3fb950]">{points.length}</strong>{' '}
          个官方物资点
        </span>
        <span>坐标已按官方游戏 X/Y 线性映射</span>
      </div>

      <div
        className="relative min-h-[320px] flex-1 overflow-auto rounded-lg border border-[#30363d] bg-[#0d1117]"
        onClick={() => onSelect('')}
      >
        <div className="relative aspect-[4/3] min-h-[480px] w-full min-w-[640px]">
          <MapSchematic regions={regions} highlightRegion={highlightRegion} />
          {points.map((p) => (
            <LootMarker
              key={p.id}
              point={p}
              selected={selectedId === p.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-[#6e7681]">
        {coordinateNote} 共 {typeCounts.size} 种容器。精确交互地图请使用
        <a
          href="https://df.qq.com/cp/a20240729directory/"
          target="_blank"
          rel="noreferrer"
          className="ml-1 text-[#58a6ff] hover:underline"
        >
          官方地图工具
        </a>
        。
      </p>
    </div>
  )
}
