import type { LootPoint } from '../types'
import { containerTypeMap } from '../data/zero-dam/container-types'
interface Props {
  points: LootPoint[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function PointList({ points, selectedId, onSelect }: Props) {
  if (points.length === 0) {
    return (
      <p className="text-xs text-[#6e7681]">没有匹配的物资点，请调整筛选条件。</p>
    )
  }

  return (
    <div className="max-h-48 overflow-y-auto rounded-md border border-[#30363d] bg-[#0d1117]">
      <ul className="divide-y divide-[#21262d]">
        {points.map((p) => {
          const meta = containerTypeMap[p.type]
          const active = p.id === selectedId
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={`w-full px-3 py-2 text-left text-xs transition-colors hover:bg-[#161b22] ${
                  active ? 'bg-[#161b22]' : ''
                }`}
              >
                <span
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[#e6edf3]">{p.name}</span>
                <span className="mt-0.5 block pl-4 text-[#6e7681]">
                  {p.officialArea} · {meta.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
