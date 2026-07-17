import { commonsContent } from '../content/guideContent'

function MultilineText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span key={`${line}-${index}`}>{line}</span>
      ))}
    </>
  )
}

export default function CommonsPage() {
  return (
    <article className="commons-page screen-enter">
      <header className="commons-hero">
        <div className="commons-hero-copy">
          <p className="commons-kicker">TOGETHER IN THE NET</p>
          <h1><MultilineText text={commonsContent.title} /></h1>
          <p className="commons-deck">{commonsContent.deck}</p>
        </div>
      </header>

      <div className="commons-editorial">
        <section className="commons-body">
          {commonsContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <section className="reflection-block reflection-block-commons">
          <p className="reflection-kicker">PAUSE / REFLECT</p>
          <p className="commons-reflection-lead">{commonsContent.reflectionLead}</p>
          <ol className="commons-bullets">
            {commonsContent.tryThis.map((tip, index) => (
              <li key={tip}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{tip}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  )
}
