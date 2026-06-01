import type { LootPoint } from '../types'
import { containerTypeMap } from '../data/zero-dam/container-types'
import { regionMap } from '../data/zero-dam/regions'

interface Props {
  point: LootPoint | null
  onClose: () => void
}

export function LootDetail({ point, onClose }: Props) {
  if (!point) {
    return (
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4 text-sm text-[#8b949e]">
        点击地图标点或列表项查看详情。所有点位均来自官方地图工具数据。
      </div>
    )
  }

  const meta = containerTypeMap[point.type]
  const region = regionMap[point.regionId]

  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="mb-1 flex flex-wrap gap-1">
            <span
              className="inline-block rounded px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${meta.color}33`, color: meta.color }}
            >
              {meta.label}
            </span>
            <span className="inline-block rounded bg-[#23863633] px-2 py-0.5 text-xs text-[#3fb950]">
              官方数据
            </span>
          </div>
          <h3 className="text-base font-semibold text-[#e6edf3]">{point.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 text-[#8b949e] hover:text-white"
          aria-label="关闭"
        >
          ✕
        </button>
      </div>

      <dl className="space-y-2 text-sm">
        <div>
          <dt className="text-[#8b949e]">官方大区域</dt>
          <dd className="text-[#e6edf3]">{point.officialArea}</dd>
        </div>
        {point.customArea && (
          <div>
            <dt className="text-[#8b949e]">自定义区域说明</dt>
            <dd className="text-[#e6edf3]">{point.customArea}</dd>
          </div>
        )}
        <div>
          <dt className="text-[#8b949e]">筛选分区</dt>
          <dd className="text-[#e6edf3]">{region.name}</dd>
        </div>
        <div>
          <dt className="text-[#8b949e]">游戏坐标</dt>
          <dd className="font-mono text-xs text-[#e6edf3]">
            X {point.gameX.toFixed(2)} · Y {point.gameY.toFixed(2)}
            {point.gameZ != null ? ` · Z ${point.gameZ.toFixed(2)}` : ''}
          </dd>
        </div>
        <div>
          <dt className="text-[#8b949e]">出现 / 随机（官方原文）</dt>
          <dd className="text-[#e6edf3]">{point.probability}</dd>
        </div>
        <div>
          <dt className="text-[#8b949e]">容器类型</dt>
          <dd className="text-[#e6edf3]">{point.loot}</dd>
        </div>
        {point.tips && (
          <div>
            <dt className="text-[#8b949e]">备注</dt>
            <dd className="text-[#7ee787]">{point.tips}</dd>
          </div>
        )}
        <div>
          <dt className="text-[#8b949e]">数据更新</dt>
          <dd className="text-xs text-[#6e7681]">
            {point.sourceFetchedAt} ·{' '}
            <a
              href={point.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              在官方地图工具中查看
            </a>
          </dd>
        </div>
      </dl>
    </div>
  )
}
