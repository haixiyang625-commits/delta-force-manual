import type { LootPoint } from '../types'
import { containerTypeMap } from '../data/zero-dam/container-types'

interface Props {
  point: LootPoint
  selected: boolean
  onSelect: (id: string) => void
}

export function LootMarker({ point, selected, onSelect }: Props) {
  const meta = containerTypeMap[point.type]
  const isSpecial = point.id.includes('boss') || point.id.includes('valve')

  return (
    <button
      type="button"
      title={point.name}
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        width: selected ? 14 : 10,
        height: selected ? 14 : 10,
        backgroundColor: meta.color,
        borderColor: selected ? '#fff' : 'rgba(255,255,255,0.35)',
        borderWidth: selected ? 2 : 1,
        boxShadow: selected ? `0 0 12px ${meta.color}` : undefined,
        opacity: isSpecial ? 0.85 : 1,
      }}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(point.id)
      }}
    />
  )
}
