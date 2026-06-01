import type { LootType, RegionId } from '../types'
import { containerTypes } from '../data/zero-dam/container-types'
import { regions } from '../data/zero-dam/regions'

interface Props {
  search: string
  onSearchChange: (v: string) => void
  regionFilter: RegionId | 'all'
  onRegionChange: (v: RegionId | 'all') => void
  typeFilter: LootType | 'all'
  onTypeChange: (v: LootType | 'all') => void
  showHighValueOnly: boolean
  onHighValueToggle: (v: boolean) => void
  visibleCount: number
  totalCount: number
  dataSource: { name: string; url: string; note: string }
}

const highValueTypes: LootType[] = [
  'safe',
  'small-safe',
  'server',
  'computer',
  'air-cargo',
  'large-weapon-box',
  'gold-coins',
  'premium-travel',
  'keycard',
]

export function Sidebar({
  search,
  onSearchChange,
  regionFilter,
  onRegionChange,
  typeFilter,
  onTypeChange,
  showHighValueOnly,
  onHighValueToggle,
  visibleCount,
  totalCount,
  dataSource,
}: Props) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 overflow-y-auto border-r border-[#30363d] bg-[#0d1117] p-4 lg:w-72">
      <div>
        <h1 className="text-lg font-bold text-[#e6edf3]">零号大坝</h1>
        <p className="mt-1 text-xs text-[#8b949e]">烽火地带 · 官方物资坐标</p>
      </div>

      <input
        type="search"
        placeholder="搜索名称或区域…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-[#e6edf3] placeholder:text-[#6e7681] focus:border-[#3fb950] focus:outline-none"
      />

      <label className="flex cursor-pointer items-center gap-2 text-sm text-[#e6edf3]">
        <input
          type="checkbox"
          checked={showHighValueOnly}
          onChange={(e) => onHighValueToggle(e.target.checked)}
          className="rounded border-[#30363d]"
        />
        仅显示高价值容器
      </label>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#8b949e]">
          区域 ({visibleCount}/{totalCount})
        </label>
        <select
          value={regionFilter}
          onChange={(e) => onRegionChange(e.target.value as RegionId | 'all')}
          className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-2 py-2 text-sm text-[#e6edf3]"
        >
          <option value="all">全部区域</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-[#8b949e]">
          容器类型
        </label>
        <select
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value as LootType | 'all')}
          className="w-full rounded-md border border-[#30363d] bg-[#161b22] px-2 py-2 text-sm text-[#e6edf3]"
        >
          <option value="all">全部类型</option>
          {containerTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {regionFilter !== 'all' && (
        <p className="text-xs leading-relaxed text-[#8b949e]">
          {regions.find((r) => r.id === regionFilter)?.description}
        </p>
      )}

      <div className="mt-auto space-y-2 border-t border-[#30363d] pt-4 text-xs text-[#6e7681]">
        <p>{dataSource.note}</p>
        <a
          href={dataSource.url}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[#58a6ff] hover:underline"
        >
          打开{dataSource.name} →
        </a>
      </div>
    </aside>
  )
}

export { highValueTypes }
