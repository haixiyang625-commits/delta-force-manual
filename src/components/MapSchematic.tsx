import type { Region, RegionId } from '../types'

interface Props {
  regions: Region[]
  highlightRegion: RegionId | 'all'
}

export function MapSchematic({ regions, highlightRegion }: Props) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="#21262d"
            strokeWidth="0.15"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="#0d1117" />
      <rect width="100" height="100" fill="url(#grid)" opacity="0.6" />

      {/* 河道示意 */}
      <path
        d="M 48 55 Q 50 70 52 95 M 48 55 Q 46 40 44 25"
        fill="none"
        stroke="#1f6feb"
        strokeWidth="0.8"
        opacity="0.35"
      />

      {regions.map((r) => {
        const active = highlightRegion === 'all' || highlightRegion === r.id
        return (
          <g key={r.id}>
            <rect
              x={r.zone.x}
              y={r.zone.y}
              width={r.zone.w}
              height={r.zone.h}
              rx="1"
              fill={active ? '#238636' : '#161b22'}
              fillOpacity={active ? 0.22 : 0.5}
              stroke={active ? '#3fb950' : '#30363d'}
              strokeWidth="0.4"
            />
            <text
              x={r.zone.x + r.zone.w / 2}
              y={r.zone.y + r.zone.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={active ? '#7ee787' : '#6e7681'}
              fontSize="2.8"
              fontWeight="600"
            >
              {r.name}
            </text>
          </g>
        )
      })}

      <text x="50" y="3.5" textAnchor="middle" fill="#8b949e" fontSize="2.2">
        北 · 行政辖区
      </text>
      <text x="3" y="50" fill="#8b949e" fontSize="2" writingMode="tb">
        西
      </text>
      <text x="97" y="50" textAnchor="end" fill="#8b949e" fontSize="2">
        东
      </text>
      <text x="50" y="98" textAnchor="middle" fill="#8b949e" fontSize="2.2">
        南
      </text>
    </svg>
  )
}
