import { useState, type CSSProperties } from 'react'
import type { ArtworkContent } from '../content/guideContent'
import ReflectionResponseList, { type ReflectionPromptItem } from './ReflectionResponseList'


type Props = {
  artwork: ArtworkContent
}

function MultilineText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span key={`${line}-${index}`}>{line}</span>
      ))}
    </>
  )
}

function InlineText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, index) => (
        part.startsWith('*') && part.endsWith('*')
          ? <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>
          : part
      ))}
    </>
  )
}

function reflectionOrder(artwork: ArtworkContent, index: number) {
  const sectionBase = artwork.sectionLabel === 'YOU AND THE NET'
    ? 1000
    : artwork.sectionLabel === 'TOGETHER IN THE NET'
      ? 2100
      : 3000

  return sectionBase + Number(artwork.sequence) * 10 + index
}

export default function ArtworkPage({ artwork }: Props) {
  const [indexUsed, setIndexUsed] = useState(false)
  const style = {
    '--title-align': artwork.titleAlign ?? 'left',
    '--artwork-title-size': artwork.titleSize ?? '42px',
    '--artwork-image-position': artwork.image?.position ?? 'center',
    '--artwork-image-aspect': artwork.image?.aspect ?? '1.58 / 1',
  } as CSSProperties

  const [lead, ...body] = artwork.description
  const sourceTitle = artwork.title.replace(/\n/g, ' ')
  const reflectionItems: ReflectionPromptItem[] = artwork.reflection.map((prompt, index) => ({
    id: `artwork:${artwork.id}:${index}`,
    section: artwork.sectionLabel,
    source: sourceTitle,
    prompt,
    order: reflectionOrder(artwork, index),
  }))

  const jumpTo = (target: 'about' | 'why-now' | 'reflect') => {
    const element = document.getElementById(`${artwork.id}-${target}`)
    if (!element) return
    setIndexUsed(true)
    element.scrollIntoView({
      behavior: document.documentElement.classList.contains('reduced-motion') ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <article
      className={`artwork-page artwork-${artwork.id} palette-${artwork.palette} screen-enter`}
      style={style}
    >
      <section className="artwork-hero" aria-labelledby={`${artwork.id}-title`}>
        {artwork.image ? (
          <figure className="artwork-hero-figure">
            <img src={artwork.image.src} alt={artwork.image.alt} />
          </figure>
        ) : (
          <div className="artwork-hero-placeholder" aria-hidden="true">
            <div className="artwork-hero-placeholder-disc" />
            <div className="artwork-hero-placeholder-grid" />
            <p>{artwork.heroLabel ?? 'PARTICIPATORY INSTALLATION'}</p>
          </div>
        )}
        <div className="artwork-hero-no" aria-hidden="true">{artwork.sequence}</div>
        <div className="artwork-hero-scrim" aria-hidden="true" />
        <div className="artwork-hero-copy">
          <p className="artwork-section-label">{artwork.sectionLabel} <span>{artwork.sequence} / {artwork.total}</span></p>
          <header className="artwork-heading">
            <h1 id={`${artwork.id}-title`}><MultilineText text={artwork.title} /></h1>
            <p className="artwork-artist"><MultilineText text={artwork.artist} /></p>
          </header>
          {artwork.image?.note && <p className="artwork-image-note">{artwork.image.note}</p>}
          <p className="artwork-scroll-cue" aria-hidden="true"><span>↓</span></p>
        </div>
      </section>

      <nav className={`artwork-jump-index ${indexUsed ? 'is-used' : ''}`} aria-label={`Jump through ${sourceTitle}`}>
        <button type="button" onClick={() => jumpTo('about')}>ABOUT</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => jumpTo('why-now')}>WHY NOW?</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => jumpTo('reflect')}>PAUSE &amp; REFLECT</button>
      </nav>

      <div className="artwork-editorial">
        <section className="artwork-opening artwork-scroll-target" id={`${artwork.id}-about`}>
          <p className="artwork-deck"><InlineText text={lead} /></p>
          <div className="artwork-body">
            {body.map((paragraph, index) => (
              <p key={paragraph} style={{ '--reveal-index': index } as CSSProperties}><InlineText text={paragraph} /></p>
            ))}
          </div>
        </section>

        <section className="artwork-context artwork-scroll-target" id={`${artwork.id}-why-now`}>
          <div className="artwork-context-head">
            <p>WHY NOW?</p>
            <span aria-hidden="true">{artwork.sequence}</span>
          </div>
          <div className="artwork-context-copy">
            {artwork.whyNow.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <blockquote className="artwork-pullquote">
          <p>{artwork.pullQuote}</p>
        </blockquote>

        <section className="reflection-block artwork-scroll-target" id={`${artwork.id}-reflect`}>
          <p className="reflection-kicker">PAUSE &amp; REFLECT</p>
          <p className="reflection-response-invitation">Optional: choose one question to answer privately.</p>
          <ReflectionResponseList items={reflectionItems} />
          <p className="reflection-storage-note">PRIVATE · SAVED ON THIS DEVICE</p>
        </section>

        <footer className="artwork-endmark" aria-hidden="true">
          <span>{artwork.sequence}/{artwork.total}</span>
        </footer>
      </div>
    </article>
  )
}
