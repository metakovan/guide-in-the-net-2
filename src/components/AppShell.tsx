import type { ReactNode } from 'react'

type ShellTone = 'black' | 'blue' | 'green' | 'red' | 'yellow'

type Props = {
  children: ReactNode
  onMenu: () => void
  onInfo: () => void
  onSettings: () => void
  onBack?: () => void
  onNext?: () => void
  nextLabel?: string
  backLabel?: string
  blue?: boolean
  tone?: ShellTone
  hideBottom?: boolean
  hideNext?: boolean
  immersive?: boolean
}

export default function AppShell({
  children,
  onMenu,
  onInfo,
  onSettings,
  onBack,
  onNext,
  nextLabel = 'NEXT',
  backLabel = 'BACK',
  blue = false,
  tone,
  hideBottom = false,
  hideNext = false,
  immersive = false,
}: Props) {
  const resolvedTone: ShellTone = tone ?? (blue ? 'blue' : 'black')

  return (
    <div className={`shell shell-${resolvedTone} ${immersive ? 'shell-immersive' : ''}`}>
      <header className="topbar">
        <button type="button" className="corner-logo-button" onClick={onMenu} aria-label="Open section menu">
          <img className="corner-logo" src="/guide/assets/upper-corner-logo-transparent.png" alt="Islands in the Net" />
        </button>
        <div className="topbar-actions">
          <button type="button" onClick={onInfo} className="icon-button" aria-label="Exhibition information">
            <img src="/guide/assets/info-icon.png" alt="" />
          </button>
          <button type="button" onClick={onSettings} className="icon-button" aria-label="Guide settings">
            <img src="/guide/assets/settings-icon.png" alt="" />
          </button>
        </div>
      </header>
      <main className="shell-content">{children}</main>
      {!hideBottom && (
        <nav className="bottom-nav" aria-label="Guide navigation">
          <button type="button" className="nav-menu" onClick={onMenu} aria-label="Open section menu">
            <img src="/guide/assets/list.svg" alt="" />
          </button>
          <button type="button" className="nav-button nav-back" onClick={onBack} disabled={!onBack}>
            {backLabel}
          </button>
          {!hideNext && (
            <button type="button" className="nav-button nav-next" onClick={onNext} disabled={!onNext}>
              {nextLabel}
            </button>
          )}
        </nav>
      )}
    </div>
  )
}
