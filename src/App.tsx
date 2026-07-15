import { useEffect, useMemo, useRef, useState } from 'react'
import AppShell from './components/AppShell'
import ArtworkPage from './components/ArtworkPage'
import CommonsPage from './components/CommonsPage'
import ClosingReflectionPage from './components/ClosingReflectionPage'
import CreditsPage from './components/CreditsPage'
import GlitchCanvas from './components/GlitchCanvas'
import IslandBlob from './components/IslandBlob'
import Modal from './components/Modal'
import ReadingRoomPage from './components/ReadingRoomPage'
import SectionMenu from './components/SectionMenu'
import {
  sectionOneArtworks,
  sectionOneIntro,
  sectionTwoArtworks,
  sectionTwoIntro,
  sectionThreeArtworks,
  sectionThreeIntro,
  type SectionIntroContent,
} from './content/guideContent'

type Screen =
  | 'loading'
  | 'cover'
  | 'name'
  | 'welcome'
  | 'how'
  | 'map'
  | 'section'
  | 'sectionIntro'
  | 'safeEntry'
  | 'history'
  | 'futureYou'
  | 'impactBench'
  | 'graceQuek'
  | 'sectionTwoCover'
  | 'sectionTwoIntro'
  | 'mapTwo'
  | 'altar'
  | 'traces'
  | 'commons'
  | 'sectionThreeCover'
  | 'sectionThreeIntro'
  | 'mapThree'
  | 'mapFour'
  | 'asiaMaxxing'
  | 'hexagram'
  | 'xo'
  | 'readingRoomCover'
  | 'readingRoom'
  | 'closing'
  | 'credits'
type Dialog = 'info' | 'settings' | null
type TextSize = 'small' | 'standard' | 'large'
type ColourMode = 'standard' | 'red-green-safe' | 'blue-yellow-safe' | 'high-contrast'

const introParagraphs = [
  'Technology no longer sits outside everyday life. It recommends what we watch, verifies who we are, speaks in our voices and increasingly helps decide how we work, move and imagine the future.',
  'Most stories about these systems still arrive from technology companies: faster, smarter, frictionless, inevitable. Islands in the Net begins somewhere else.',
  'The exhibition takes its name from Bruce Sterling’s 1988 cyberpunk novel, which imagined Singapore as a node in a new global network of data and influence. Nearly four decades later, we return to that image from Southeast Asia.',
  'Here, the islands form an archipelago: distinct histories, cultures and ways of knowing, connected by uneven flows of people, capital and information.',
]

const guideActions = [
  {
    icon: '/guide/assets/linger.png',
    iconHeight: '146px',
    label: 'LINGER',
    text: 'Stay with an idea beyond your first reaction.',
  },
  {
    icon: '/guide/assets/form-thoughts.png',
    iconHeight: '60px',
    label: 'TAKE A POSITION',
    text: 'Form your own view. Change it if the work gives you reason.',
  },
  {
    icon: '/guide/assets/converse.png',
    iconHeight: '70px',
    label: 'JOIN IN',
    text: 'Talk with someone, vote, or leave a thought for whoever comes next.',
  },
  {
    icon: '/guide/assets/reflect.png',
    iconHeight: '95px',
    label: 'PAUSE',
    text: 'Sit, listen, read, write—or do nothing for a while.',
  },
  {
    icon: '/guide/assets/return.png',
    iconHeight: '108px',
    label: 'RETURN',
    text: 'Return after dark for screenings, performances, talks and late-night takeovers.',
  },
  {
    icon: '/guide/assets/share.png',
    iconHeight: '118px',
    label: 'SHARE, OR DON’T',
    text: 'Photograph and post, remix, or keep the experience offline. Feed the algorithm with #IslandsInTheNetSG',
  },
]

const guideImageUrls = Array.from(new Set([
  '/guide/assets/main-splash-logo.png',
  '/guide/assets/upper-corner-logo-transparent.png',
  '/guide/assets/info-icon.png',
  '/guide/assets/settings-icon.png',
  '/guide/assets/map-step-1.png',
  '/guide/assets/map-step-2.png',
  '/guide/assets/map-step-3.png',
  '/guide/assets/map-step-4.png',
  ...guideActions.map(({ icon }) => icon),
  ...Object.values(sectionOneArtworks).flatMap(({ image }) => image ? [image.src] : []),
  ...Object.values(sectionTwoArtworks).flatMap(({ image }) => image ? [image.src] : []),
  ...Object.values(sectionThreeArtworks).flatMap(({ image }) => image ? [image.src] : []),
]))

let guideImagePreload: Promise<void> | undefined

function preloadGuideImages() {
  if (guideImagePreload) return guideImagePreload

  guideImagePreload = Promise.all(guideImageUrls.map((src) => new Promise<void>((resolve) => {
    const image = new Image()
    const timeout = window.setTimeout(resolve, 4000)
    const finish = () => {
      window.clearTimeout(timeout)
      resolve()
    }

    image.onload = finish
    image.onerror = finish
    image.src = src
  }))).then(() => undefined)

  return guideImagePreload
}

function readStoredName() {
  try {
    return localStorage.getItem('iitn-guide-name') ?? ''
  } catch {
    return ''
  }
}

function readStoredMotion() {
  try {
    return localStorage.getItem('iitn-guide-reduced-motion') === 'true'
  } catch {
    return false
  }
}

function readStoredTextSize(): TextSize {
  try {
    const value = localStorage.getItem('iitn-guide-text-size')
    return value === 'small' || value === 'large' ? value : 'standard'
  } catch {
    return 'standard'
  }
}

function readStoredColourMode(): ColourMode {
  try {
    const value = localStorage.getItem('iitn-guide-colour-mode')
    return value === 'red-green-safe' || value === 'blue-yellow-safe' || value === 'high-contrast' ? value : 'standard'
  } catch {
    return 'standard'
  }
}

const validScreens: Screen[] = [
  'loading',
  'cover',
  'name',
  'welcome',
  'how',
  'map',
  'section',
  'sectionIntro',
  'safeEntry',
  'history',
  'futureYou',
  'impactBench',
  'graceQuek',
  'sectionTwoCover',
  'sectionTwoIntro',
  'mapTwo',
  'altar',
  'traces',
  'commons',
  'sectionThreeCover',
  'sectionThreeIntro',
  'mapThree',
  'mapFour',
  'asiaMaxxing',
  'hexagram',
  'xo',
  'readingRoomCover',
  'readingRoom',
  'closing',
  'credits',
]

function sectionForScreen(screen: Screen): 'beginning' | 'one' | 'two' | 'three' | 'four' | 'finale' {
  if (['loading', 'cover', 'name', 'welcome', 'how', 'map'].includes(screen)) return 'beginning'
  if (['section', 'sectionIntro', 'safeEntry', 'history', 'futureYou', 'impactBench', 'graceQuek'].includes(screen)) return 'one'
  if (['sectionTwoCover', 'sectionTwoIntro', 'mapTwo', 'commons', 'altar', 'traces'].includes(screen)) return 'two'
  if (['sectionThreeCover', 'sectionThreeIntro', 'mapThree', 'asiaMaxxing', 'hexagram', 'xo'].includes(screen)) return 'three'
  if (['readingRoomCover', 'mapFour', 'readingRoom'].includes(screen)) return 'four'
  return 'finale'
}

function initialScreen(): Screen {
  const candidate = new URLSearchParams(window.location.search).get('screen') as Screen | null
  return candidate && validScreens.includes(candidate) ? candidate : 'loading'
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [dialog, setDialog] = useState<Dialog>(null)
  const [name, setName] = useState(readStoredName)
  const [draftName, setDraftName] = useState(readStoredName)
  const [reducedMotion, setReducedMotion] = useState(readStoredMotion)
  const [textSize, setTextSize] = useState<TextSize>(readStoredTextSize)
  const [colourMode, setColourMode] = useState<ColourMode>(readStoredColourMode)
  const [menuOpen, setMenuOpen] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion)
    try {
      localStorage.setItem('iitn-guide-reduced-motion', String(reducedMotion))
    } catch {
      // Storage may be unavailable in private browsing; the guide still works.
    }
  }, [reducedMotion])

  useEffect(() => {
    document.documentElement.dataset.textSize = textSize
    try {
      localStorage.setItem('iitn-guide-text-size', textSize)
    } catch {
      // Non-blocking.
    }
  }, [textSize])

  useEffect(() => {
    document.documentElement.dataset.colourMode = colourMode
    try {
      localStorage.setItem('iitn-guide-colour-mode', colourMode)
    } catch {
      // Non-blocking.
    }
  }, [colourMode])

  useEffect(() => {
    if (screen !== 'loading') return
    const minimumDelay = reducedMotion ? 700 : 2700
    const fallbackDelay = reducedMotion ? 1800 : 5000
    let cancelled = false

    void Promise.race([
      Promise.all([
        preloadGuideImages(),
        new Promise<void>((resolve) => window.setTimeout(resolve, minimumDelay)),
      ]),
      new Promise<void>((resolve) => window.setTimeout(resolve, fallbackDelay)),
    ]).then(() => {
      if (!cancelled) setScreen('cover')
    })

    return () => {
      cancelled = true
    }
  }, [screen, reducedMotion])

  useEffect(() => {
    const scroller = mainRef.current?.querySelector<HTMLElement>('.shell-content')
    scroller?.scrollTo({ top: 0, behavior: 'auto' })
  }, [screen])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (screen === 'loading') url.searchParams.delete('screen')
    else url.searchParams.set('screen', screen)
    window.history.replaceState(null, '', url)
  }, [screen])

  const displayName = useMemo(() => name.trim() || 'FRIEND', [name])

  const go = (next: Screen) => {
    setDialog(null)
    setMenuOpen(false)
    setScreen(next)
  }

  const saveName = () => {
    const clean = draftName.trim().slice(0, 32)
    if (!clean) return
    setName(clean)
    try {
      localStorage.setItem('iitn-guide-name', clean)
    } catch {
      // Non-blocking.
    }
    go('welcome')
  }

  const restart = () => {
    setDialog(null)
    setMenuOpen(false)
    setScreen('loading')
  }

  const updateNameFromSettings = (value: string) => {
    const clean = value.slice(0, 32)
    setName(clean)
    setDraftName(clean)
    try {
      localStorage.setItem('iitn-guide-name', clean)
    } catch {
      // Non-blocking.
    }
  }

  return (
    <div className={`app-stage stage-${screen}`} ref={mainRef}>
      <div className="phone-frame" key={screen}>
        {screen === 'loading' && <LoadingScreen reducedMotion={reducedMotion} />}

        {screen === 'cover' && (
          <CoverScreen reducedMotion={reducedMotion} onStart={() => go('name')} />
        )}

        {screen === 'name' && (
          <NameScreen
            value={draftName}
            onChange={setDraftName}
            onSubmit={saveName}
            onBack={() => go('cover')}
          />
        )}

        {screen === 'welcome' && (
          <AppShell
            onMenu={() => setMenuOpen(true)}
            onInfo={() => setDialog('info')}
            onSettings={() => setDialog('settings')}
            onBack={() => go('name')}
            onNext={() => go('how')}
          >
            <article className="welcome-screen screen-enter">
              <h1 className="welcome-heading">
                WELCOME, {displayName.toUpperCase()}.
                <span>TO A MEETING PLACE</span>
                <span>FOR WHAT COMES NEXT</span>
              </h1>
              <div className="intro-copy">
                {introParagraphs.map((paragraph, index) => (
                  <p key={paragraph} style={{ '--reveal-index': index } as React.CSSProperties}>
                    {paragraph.includes('Islands in the Net') ? (
                      <>
                        {paragraph.split('Islands in the Net')[0]}
                        <em>Islands in the Net</em>
                        {paragraph.split('Islands in the Net')[1]}
                      </>
                    ) : paragraph}
                  </p>
                ))}
              </div>
            </article>
          </AppShell>
        )}

        {screen === 'how' && (
          <AppShell
            blue
            onMenu={() => setMenuOpen(true)}
            onInfo={() => setDialog('info')}
            onSettings={() => setDialog('settings')}
            onBack={() => go('welcome')}
            onNext={() => go('map')}
          >
            <article className="how-screen screen-enter">
              <h1>HOW TO USE THIS SPACE</h1>
              <div className="action-list">
                {guideActions.map((action, index) => (
                  <section
                    className="action-item"
                    key={action.text}
                    style={{ '--reveal-index': index } as React.CSSProperties}
                  >
                    <div className="action-icon" style={{ '--icon-height': action.iconHeight } as React.CSSProperties}>
                      <img src={action.icon} alt="" />
                    </div>
                    <p><strong>{action.label}:</strong> {action.text}</p>
                  </section>
                ))}
              </div>
              <p className="closing-invitation">
                Take any route through the exhibition. Let the questions remain open. Linger, disagree, change your mind and leave something behind.
              </p>
            </article>
          </AppShell>
        )}

        {screen === 'map' && (
          <AppShell
            blue
            onMenu={() => setMenuOpen(true)}
            onInfo={() => setDialog('info')}
            onSettings={() => setDialog('settings')}
            onBack={() => go('how')}
            onNext={() => go('section')}
          >
            <MapScreen heading={`STEP INTO THE NET, ${displayName.toUpperCase()}.`} marker="one" image="/guide/assets/map-step-1.png" alt="Map of the exhibition showing the route into You and the Net" note={['FOLLOW THE LIGHTS.', 'TAKE YOUR TIME.']} />
          </AppShell>
        )}

        {screen === 'section' && (
          <AppShell
            immersive
            onMenu={() => setMenuOpen(true)}
            onInfo={() => setDialog('info')}
            onSettings={() => setDialog('settings')}
            onBack={() => go('map')}
            onNext={() => go('sectionIntro')}
          >
            <SectionArrival reducedMotion={reducedMotion} number="SECTION 1" title={'YOU AND\nTHE NET'} subtitle={'TECHNOLOGY, IDENTITY AND\nTHE POSSIBLE SELF'} tone="pink" variant="one" align="center" />
          </AppShell>
        )}

        {screen === 'sectionIntro' && (
          <AppShell
            blue
            onMenu={() => setMenuOpen(true)}
            onInfo={() => setDialog('info')}
            onSettings={() => setDialog('settings')}
            onBack={() => go('section')}
            onNext={() => go('safeEntry')}
          >
            <SectionIntroScreen content={sectionOneIntro} titleOverride={`${displayName.toUpperCase()} AND\nTHE NET`} />
          </AppShell>
        )}

        {screen === 'safeEntry' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('sectionIntro')} onNext={() => go('history')}>
            <ArtworkPage artwork={sectionOneArtworks['safe-entry']} />
          </AppShell>
        )}

        {screen === 'history' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('safeEntry')} onNext={() => go('futureYou')}>
            <ArtworkPage artwork={sectionOneArtworks.history} />
          </AppShell>
        )}

        {screen === 'futureYou' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('history')} onNext={() => go('impactBench')}>
            <ArtworkPage artwork={sectionOneArtworks['future-you']} />
          </AppShell>
        )}

        {screen === 'impactBench' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('futureYou')} onNext={() => go('graceQuek')}>
            <ArtworkPage artwork={sectionOneArtworks.impactbench} />
          </AppShell>
        )}

        {screen === 'graceQuek' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('impactBench')} onNext={() => go('sectionTwoCover')}>
            <ArtworkPage artwork={sectionOneArtworks['grace-quek']} />
          </AppShell>
        )}

        {screen === 'sectionTwoCover' && (
          <AppShell immersive onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('graceQuek')} onNext={() => go('sectionTwoIntro')}>
            <SectionArrival reducedMotion={reducedMotion} number="SECTION 2" title={'TOGETHER\nIN THE\nNET'} subtitle={'COMMUNITY, MEMORY AND\nCOLLECTIVE WORLDBUILDING'} tone="blue" variant="two" align="center" />
          </AppShell>
        )}

        {screen === 'sectionTwoIntro' && (
          <AppShell blue onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('sectionTwoCover')} onNext={() => go('mapTwo')}>
            <SectionIntroScreen content={sectionTwoIntro} />
          </AppShell>
        )}

        {screen === 'mapTwo' && (
          <AppShell blue onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('sectionTwoIntro')} onNext={() => go('commons')}>
            <MapScreen heading={`MAKE YOUR WAY TO THE COMMONS, ${displayName.toUpperCase()}.`} marker="two" image="/guide/assets/map-step-2.png" alt="Map of the exhibition showing the route into Together in the Net" note={['FOLLOW THE CURVE TO THE COMMONS.', 'THIS PART OF THE EXHIBITION IS MADE TO BE SHARED.']} />
          </AppShell>
        )}

        {screen === 'altar' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('commons')} onNext={() => go('traces')}>
            <ArtworkPage artwork={sectionTwoArtworks.altar} />
          </AppShell>
        )}

        {screen === 'traces' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('altar')} onNext={() => go('sectionThreeCover')}>
            <ArtworkPage artwork={sectionTwoArtworks.traces} />
          </AppShell>
        )}

        {screen === 'commons' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('mapTwo')} onNext={() => go('altar')}>
            <CommonsPage />
          </AppShell>
        )}

        {screen === 'sectionThreeCover' && (
          <AppShell immersive tone="green" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('traces')} onNext={() => go('sectionThreeIntro')}>
            <SectionArrival reducedMotion={reducedMotion} number="SECTION 3" title={'HERE IN\nTHE NET'} subtitle={'SOUTHEAST ASIA AND ITS\nTECHNOLOGICAL FUTURES'} tone="green" variant="three" align="center" />
          </AppShell>
        )}

        {screen === 'sectionThreeIntro' && (
          <AppShell tone="red" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('sectionThreeCover')} onNext={() => go('mapThree')}>
            <SectionIntroScreen content={sectionThreeIntro} variant="here" />
          </AppShell>
        )}

        {screen === 'mapThree' && (
          <AppShell tone="green" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('sectionThreeIntro')} onNext={() => go('asiaMaxxing')}>
            <MapScreen heading={`FIND YOURSELF HERE, ${displayName.toUpperCase()}.`} marker="three" image="/guide/assets/map-step-3.png" alt="Map of the exhibition showing the route into Here in the Net" note={['FOLLOW THE DOTTED PATH.', 'THE FUTURE LOOKS DIFFERENT WHEN IT IS IMAGINED FROM HERE.']} />
          </AppShell>
        )}

        {screen === 'asiaMaxxing' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('mapThree')} onNext={() => go('hexagram')}>
            <ArtworkPage artwork={sectionThreeArtworks['asia-maxxing']} />
          </AppShell>
        )}

        {screen === 'hexagram' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('asiaMaxxing')} onNext={() => go('xo')}>
            <ArtworkPage artwork={sectionThreeArtworks.hexagram} />
          </AppShell>
        )}

        {screen === 'xo' && (
          <AppShell onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('hexagram')} onNext={() => go('readingRoomCover')}>
            <ArtworkPage artwork={sectionThreeArtworks.xo} />
          </AppShell>
        )}

        {screen === 'readingRoomCover' && (
          <AppShell immersive onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('xo')} onNext={() => go('mapFour')}>
            <ReadingRoomArrival reducedMotion={reducedMotion} />
          </AppShell>
        )}

        {screen === 'mapFour' && (
          <AppShell tone="yellow" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('readingRoomCover')} onNext={() => go('readingRoom')}>
            <MapScreen heading={`WELCOME TO THE READING ROOM, ${displayName.toUpperCase()}.`} marker="four" image="/guide/assets/map-step-4.png" alt="Map of the exhibition showing the route into the Futures Reading Room" note={['FOLLOW THE LIGHTS INTO THE ARCHIVE.', 'BEGIN ANYWHERE.']} />
          </AppShell>
        )}

        {screen === 'readingRoom' && (
          <AppShell tone="yellow" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('mapFour')} onNext={() => go('closing')}>
            <ReadingRoomPage />
          </AppShell>
        )}

        {screen === 'closing' && (
          <AppShell tone="yellow" onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('readingRoom')} onNext={() => go('credits')} nextLabel="FINISH">
            <ClosingReflectionPage visitorName={displayName} />
          </AppShell>
        )}

        {screen === 'credits' && (
          <AppShell immersive onMenu={() => setMenuOpen(true)} onInfo={() => setDialog('info')} onSettings={() => setDialog('settings')} onBack={() => go('closing')} hideNext>
            <CreditsPage visitorName={displayName} onRestart={restart} />
          </AppShell>
        )}

        {menuOpen && (
          <SectionMenu
            currentSection={sectionForScreen(screen)}
            onClose={() => setMenuOpen(false)}
            onSelect={(destination) => go(destination)}
          />
        )}
      </div>

      {dialog === 'info' && <InfoDialog onClose={() => setDialog(null)} />}
      {dialog === 'settings' && (
        <SettingsDialog
          name={name}
          reducedMotion={reducedMotion}
          textSize={textSize}
          colourMode={colourMode}
          onNameChange={updateNameFromSettings}
          onMotionChange={setReducedMotion}
          onTextSizeChange={setTextSize}
          onColourModeChange={setColourMode}
          onRestart={restart}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  )
}

function LoadingScreen({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="loading-screen screen-enter" aria-live="polite">
      <div className="loading-lockup">
        <div className="loading-track" aria-hidden="true">
          <span className={reducedMotion ? 'instant' : ''} />
        </div>
        <p>LOADING<br />YOUR<br />GUIDE</p>
      </div>
    </section>
  )
}

function CoverScreen({ reducedMotion, onStart }: { reducedMotion: boolean; onStart: () => void }) {
  return (
    <section className="cover-screen screen-enter">
      <GlitchCanvas reducedMotion={reducedMotion} />
      <IslandBlob className="cover-blob blob-a" variant={1} />
      <IslandBlob className="cover-blob blob-b" variant={2} />
      <IslandBlob className="cover-blob blob-c" variant={3} />
      <IslandBlob className="cover-blob blob-d" variant={1} />
      <div className="cover-content">
        <img className="splash-logo" src="/guide/assets/main-splash-logo.png" alt="Islands in the Net" />
        <p className="cover-tagline">A MEETING PLACE FOR SOUTHEAST ASIAN FUTURES:<br />EVERYDAY LIFE IN THE AGE OF AI, DATA &amp; MEMES</p>
        <button type="button" className="start-button" onClick={onStart}>START</button>
      </div>
    </section>
  )
}

function NameScreen({
  value,
  onChange,
  onSubmit,
  onBack,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => inputRef.current?.focus(), 500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <section className="name-screen blue-grain screen-enter">
      <button type="button" className="quiet-back" onClick={onBack} aria-label="Back to cover">←</button>
      <form
        className="name-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="visitor-name">HOW SHOULD WE ADDRESS<br />YOU TODAY?</label>
        <div className="name-field-wrap">
          <input
            ref={inputRef}
            id="visitor-name"
            name="visitor-name"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="A name, real or imagined..."
            autoComplete="nickname"
            enterKeyHint="go"
            maxLength={32}
          />
          <button type="submit" className="name-submit" disabled={!value.trim()} aria-label="Continue">
            ↵
          </button>
        </div>
        <p className="name-hint">PRESS RETURN TO ENTER THE NET</p>
      </form>
    </section>
  )
}

function MapScreen({ heading, image, alt, note, marker }: { heading: string; image: string; alt: string; note: string[]; marker: 'one' | 'two' | 'three' | 'four' }) {
  return (
    <article className={`map-screen map-step-${marker} screen-enter`}>
      <h1>{heading}</h1>
      <div className="map-wrap">
        <img src={image} alt={alt} />
        <span className="map-pulse" aria-hidden="true" />
      </div>
      <p className="map-note">{note.map((line) => <span key={line}>{line}</span>)}</p>
    </article>
  )
}

function SectionArrival({
  reducedMotion,
  number,
  title,
  subtitle,
  tone,
  variant,
  align,
}: {
  reducedMotion: boolean
  number: string
  title: string
  subtitle: string
  tone: 'pink' | 'blue' | 'green'
  variant: 'one' | 'two' | 'three'
  align: 'left' | 'center'
}) {
  return (
    <section className={`section-arrival section-arrival-${variant} section-align-${align} screen-enter`}>
      <GlitchCanvas reducedMotion={reducedMotion} tone={tone} />
      <IslandBlob className="section-blob section-blob-a" variant={tone === 'blue' ? 1 : tone === 'green' ? 3 : 2} />
      <IslandBlob className="section-blob section-blob-b" variant={tone === 'green' ? 1 : 3} />
      <IslandBlob className="section-blob section-blob-c" variant={tone === 'blue' ? 2 : 1} />
      <div className="section-arrival-content">
        <p className="section-number">{number}</p>
        <h1>{title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="section-subtitle">{subtitle.split('\n').map((line) => <span key={line}>{line}</span>)}</p>
      </div>
    </section>
  )
}

function ReadingRoomArrival({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="reading-room-arrival screen-enter">
      <GlitchCanvas reducedMotion={reducedMotion} tone="yellow" />
      <IslandBlob className="reading-room-blob reading-room-blob-a" variant={3} />
      <IslandBlob className="reading-room-blob reading-room-blob-b" variant={1} />
      <div className="reading-room-arrival-copy">
        <p className="section-number">SECTION 4</p>
        <h1><span>FUTURES</span><span>READING</span><span>ROOM</span></h1>
        <p className="section-subtitle"><span>RESEARCH ARCHIVE OF</span><span>SOUTHEAST ASIAN FUTURES</span></p>
      </div>
    </section>
  )
}

function SectionIntroScreen({ content, variant = 'default', titleOverride }: { content: SectionIntroContent; variant?: 'default' | 'here'; titleOverride?: string }) {
  return (
    <article className={`section-intro section-intro-${variant} ${titleOverride ? 'section-intro-personalized' : ''} screen-enter`}>
      <p className="section-intro-number">{content.number}</p>
      <h1>
        {(titleOverride ?? content.title).split('\n').map((line) => <span key={line}>{line}</span>)}
      </h1>
      {content.lead && <p className="section-intro-lead">{content.lead}</p>}
      <div className="section-intro-copy">
        {content.paragraphs.map((paragraph, index) => (
          <p key={paragraph} style={{ '--reveal-index': index } as React.CSSProperties}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

function SectionComplete({ title, kicker, body }: { title: string; kicker: string; body: string }) {
  return (
    <article className="slice-complete screen-enter">
      <p className="slice-complete-kicker">{kicker}</p>
      <h1>{title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
      <p>{body}</p>
      <small>NEXT SECTION COMING SOON</small>
    </article>
  )
}

function InfoDialog({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="EXHIBITION INFO" onClose={onClose}>
      <div className="info-grid">
        <div><span>WHEN</span><strong>17 JUL — 16 NOV</strong></div>
        <div><span>WHERE</span><strong>PADIMAI ART &amp; TECH STUDIO<br />TANJONG PAGAR DISTRIPARK</strong></div>
        <div><span>HOURS</span><strong>11AM — 7PM</strong></div>
      </div>
      <p className="modal-body-copy">
        Islands in the Net is part exhibition, part public living room and part changing programme. Through artworks, archives, AI systems, performances and public questions, it considers how technology is shaping everyday life in Southeast Asia—and how we might shape it in return.
      </p>
      <div className="admission-info">
        <strong>FREE ENTRY</strong>
        <p>Some programmes are ticketed. No specialist knowledge is required.</p>
      </div>
    </Modal>
  )
}

function SettingsDialog({
  name,
  reducedMotion,
  textSize,
  colourMode,
  onNameChange,
  onMotionChange,
  onTextSizeChange,
  onColourModeChange,
  onRestart,
  onClose,
}: {
  name: string
  reducedMotion: boolean
  textSize: TextSize
  colourMode: ColourMode
  onNameChange: (value: string) => void
  onMotionChange: (value: boolean) => void
  onTextSizeChange: (value: TextSize) => void
  onColourModeChange: (value: ColourMode) => void
  onRestart: () => void
  onClose: () => void
}) {
  const sizeOrder: TextSize[] = ['small', 'standard', 'large']
  const sizeIndex = sizeOrder.indexOf(textSize)
  const changeSize = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(sizeOrder.length - 1, sizeIndex + direction))
    onTextSizeChange(sizeOrder[next])
  }

  return (
    <Modal title="GUIDE SETTINGS" onClose={onClose}>
      <label className="settings-field">
        <span>YOUR NAME</span>
        <input value={name} onChange={(event) => onNameChange(event.target.value)} maxLength={32} />
      </label>

      <div className="settings-control-group">
        <span>TEXT SIZE</span>
        <div className="settings-stepper" role="group" aria-label="Text size">
          <button type="button" onClick={() => changeSize(-1)} disabled={sizeIndex === 0} aria-label="Decrease text size">A−</button>
          <output aria-live="polite">{textSize.toUpperCase()}</output>
          <button type="button" onClick={() => changeSize(1)} disabled={sizeIndex === sizeOrder.length - 1} aria-label="Increase text size">A+</button>
        </div>
      </div>

      <label className="settings-select">
        <span>COLOUR ACCESSIBILITY</span>
        <select value={colourMode} onChange={(event) => onColourModeChange(event.target.value as ColourMode)}>
          <option value="standard">STANDARD PALETTE</option>
          <option value="red-green-safe">RED / GREEN SAFE</option>
          <option value="blue-yellow-safe">BLUE / YELLOW SAFE</option>
          <option value="high-contrast">HIGH CONTRAST</option>
        </select>
      </label>

      <label className="settings-toggle">
        <span>REDUCE MOTION</span>
        <input
          type="checkbox"
          checked={reducedMotion}
          onChange={(event) => onMotionChange(event.target.checked)}
        />
        <i aria-hidden="true" />
      </label>
      <button type="button" className="restart-button" onClick={onRestart}>RESTART GUIDE</button>
    </Modal>
  )
}
