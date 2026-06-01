const siteCn = import.meta.env.VITE_SITE_CN?.trim()
const siteIntl = import.meta.env.VITE_SITE_INTL?.trim()

function normalizeUrl(url: string) {
  return url.replace(/\/$/, '')
}

function isCurrent(url: string) {
  if (typeof window === 'undefined') return false
  try {
    const a = new URL(url, window.location.origin)
    const b = new URL(window.location.href)
    return normalizeUrl(a.origin + a.pathname) === normalizeUrl(b.origin + b.pathname)
  } catch {
    return false
  }
}

export function MirrorLinks() {
  if (!siteCn && !siteIntl) return null

  const onCn = siteCn ? isCurrent(siteCn) : false
  const onIntl = siteIntl ? isCurrent(siteIntl) : false

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-[#6e7681]">访问线路：</span>
      {siteCn && (
        <a
          href={siteCn}
          className={`rounded px-2 py-0.5 ${
            onCn
              ? 'bg-[#238636] text-[#e6edf3]'
              : 'border border-[#30363d] text-[#58a6ff] hover:underline'
          }`}
          {...(onCn ? { 'aria-current': 'page' as const } : { target: '_blank', rel: 'noreferrer' })}
        >
          国内
        </a>
      )}
      {siteIntl && (
        <a
          href={siteIntl}
          className={`rounded px-2 py-0.5 ${
            onIntl
              ? 'bg-[#238636] text-[#e6edf3]'
              : 'border border-[#30363d] text-[#58a6ff] hover:underline'
          }`}
          {...(onIntl ? { 'aria-current': 'page' as const } : { target: '_blank', rel: 'noreferrer' })}
        >
          海外 International
        </a>
      )}
      {onIntl && siteCn && (
        <span className="text-[#6e7681]">· 国内打不开当前页请点「国内」</span>
      )}
    </div>
  )
}
