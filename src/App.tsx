import { useMemo, useState } from 'react'
import type { LootType, MapDifficulty, RegionId } from './types'
import {
  availableDifficulties,
  getLootPoints,
  officialBundle,
} from './data/zero-dam'
import { mapMeta } from './data/zero-dam/map-meta'
import { MapViewer } from './components/MapViewer'
import { Sidebar, highValueTypes } from './components/Sidebar'
import { LootDetail } from './components/LootDetail'
import { PointList } from './components/PointList'

function App() {
  const [difficulty, setDifficulty] = useState<MapDifficulty>('常规')
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState<RegionId | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<LootType | 'all'>('all')
  const [showHighValueOnly, setShowHighValueOnly] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const allPoints = useMemo(() => getLootPoints(difficulty), [difficulty])

  const filteredPoints = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allPoints.filter((p) => {
      if (regionFilter !== 'all' && p.regionId !== regionFilter) return false
      if (typeFilter !== 'all' && p.type !== typeFilter) return false
      if (showHighValueOnly && !highValueTypes.includes(p.type)) return false
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.officialArea.toLowerCase().includes(q)
      ) {
        return false
      }
      return true
    })
  }, [allPoints, search, regionFilter, typeFilter, showHighValueOnly])

  const selectedPoint = allPoints.find((p) => p.id === selectedId) ?? null

  const handleSelect = (id: string) => {
    setSelectedId(id || null)
  }

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="border-b border-[#30363d] bg-[#161b22] px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-[#8b949e]">{mapMeta.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#8b949e]">难度</span>
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value as MapDifficulty)
                setSelectedId(null)
              }}
              className="rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1 text-[#e6edf3]"
            >
              {availableDifficulties.map((d) => (
                <option key={d} value={d}>
                  {d}（{officialBundle.counts[d]} 点）
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-2 text-xs text-[#3fb950]">
          数据来源：{officialBundle.dataSource.name} · 坐标与出现条件为官方字段
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <Sidebar
          search={search}
          onSearchChange={setSearch}
          regionFilter={regionFilter}
          onRegionChange={setRegionFilter}
          typeFilter={typeFilter}
          onTypeChange={setTypeFilter}
          showHighValueOnly={showHighValueOnly}
          onHighValueToggle={setShowHighValueOnly}
          visibleCount={filteredPoints.length}
          totalCount={allPoints.length}
          dataSource={officialBundle.dataSource}
        />

        <main className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:flex-row">
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <MapViewer
              points={filteredPoints}
              selectedId={selectedId}
              highlightRegion={regionFilter}
              onSelect={handleSelect}
              coordinateNote={officialBundle.coordinateNote}
            />
          </div>

          <div className="flex w-full shrink-0 flex-col gap-4 lg:w-80">
            <LootDetail
              point={selectedPoint}
              onClose={() => setSelectedId(null)}
            />

            <section>
              <h2 className="mb-2 text-sm font-semibold text-[#e6edf3]">
                物资点列表
              </h2>
              <PointList
                points={filteredPoints}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            </section>

            <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
              <h2 className="mb-2 text-sm font-semibold text-[#e6edf3]">
                新手建议
              </h2>
              <ul className="list-inside list-disc space-y-1 text-xs text-[#8b949e]">
                {mapMeta.beginnerTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
