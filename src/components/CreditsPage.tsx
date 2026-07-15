import { useEffect, useMemo, useState } from 'react'
import { readArchiveReceipt, saveToArchive, type ArchiveReceipt } from '../utils/archiveSave'
import { readReflectionEntries, type ReflectionEntry } from '../utils/reflections'
import { downloadRewindAsJpg, downloadRewindAsPdf } from '../utils/rewindExport'
import '../reflectionFeatures.css'

type Props = {
  visitorName: string
  onRestart: () => void
}

type ExportFormat = 'pdf' | 'jpg'

function sourceKey(entry: ReflectionEntry) {
  return `${entry.section}::${entry.source}`
}

export default function CreditsPage({ visitorName, onRestart }: Props) {
  const [entries, setEntries] = useState<ReflectionEntry[]>(readReflectionEntries)
  const [exporting, setExporting] = useState<ExportFormat | null>(null)
  const [exportError, setExportError] = useState('')
  const [archiving, setArchiving] = useState(false)
  const [archiveError, setArchiveError] = useState('')
  const [archiveReceipt, setArchiveReceipt] = useState<ArchiveReceipt | null>(readArchiveReceipt)

  useEffect(() => {
    const refresh = () => setEntries(readReflectionEntries())
    window.addEventListener('iitn-reflections-changed', refresh)
    refresh()
    return () => window.removeEventListener('iitn-reflections-changed', refresh)
  }, [])

  const sourceNumbers = useMemo(() => {
    const numbers = new Map<string, number>()
    entries.forEach((entry) => {
      const key = sourceKey(entry)
      if (!numbers.has(key)) numbers.set(key, numbers.size + 1)
    })
    return numbers
  }, [entries])

  const exportRewind = async (format: ExportFormat) => {
    setExporting(format)
    setExportError('')
    try {
      if (format === 'pdf') await downloadRewindAsPdf(visitorName, entries)
      else await downloadRewindAsJpg(visitorName, entries)
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Field Notes could not be exported on this device.')
    } finally {
      setExporting(null)
    }
  }

  const shareToArchive = async () => {
    setArchiving(true)
    setArchiveError('')
    try {
      setArchiveReceipt(await saveToArchive(visitorName, entries))
    } catch (error) {
      setArchiveError(error instanceof Error ? error.message : 'The archive could not be reached — please try again.')
    } finally {
      setArchiving(false)
    }
  }

  return (
    <article className="credits-page screen-enter">
      <div className="credits-glitch" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <div className="credits-message">
        <p>Thank you for spending time in the net, {visitorName}.</p>
      </div>

      <section className="rewind-card" aria-labelledby="rewind-card-title">
        <header className="rewind-card-head">
          <div>
            <p>YOUR TRACE THROUGH THE EXHIBITION</p>
            <h2 id="rewind-card-title">FIELD NOTES<br />FROM THE NET</h2>
          </div>
          <span>{String(entries.length).padStart(2, '0')}</span>
        </header>

        {entries.length > 0 ? (
          <>
            <p className="rewind-card-intro">
              Your responses, gathered into one private record to keep, revisit or discard.
            </p>
            <div className="rewind-card-list">
              {entries.map((entry, index) => {
                const key = sourceKey(entry)
                const previous = entries[index - 1]
                const startsSource = !previous || sourceKey(previous) !== key
                return (
                  <article className="rewind-answer" key={entry.id}>
                    {startsSource && (
                      <header className="rewind-answer-source">
                        <span>{String(sourceNumbers.get(key) ?? 1).padStart(2, '0')}</span>
                        <div>
                          <p>{entry.section}</p>
                          <h3>{entry.source}</h3>
                        </div>
                      </header>
                    )}
                    <p className="rewind-answer-question">{entry.prompt}</p>
                    <p className="rewind-answer-response">{entry.response}</p>
                  </article>
                )
              })}
            </div>

            <div className="rewind-downloads" aria-label="Download your Field Notes">
              <button type="button" onClick={() => exportRewind('pdf')} disabled={exporting !== null}>
                {exporting === 'pdf' ? 'PREPARING PDF…' : 'DOWNLOAD PDF'}
              </button>
              <button type="button" onClick={() => exportRewind('jpg')} disabled={exporting !== null}>
                {exporting === 'jpg' ? 'PREPARING JPG…' : 'DOWNLOAD JPG'}
              </button>
            </div>
            {exportError && <p className="rewind-export-error" role="alert">{exportError}</p>}

            <div className="rewind-archive">
              <button type="button" onClick={shareToArchive} disabled={archiving}>
                {archiving ? 'SAVING TO THE ARCHIVE…'
                  : archiveReceipt ? 'SAVE TO THE ARCHIVE AGAIN' : 'SAVE TO THE EXHIBITION ARCHIVE'}
              </button>
              <p className="rewind-archive-note">
                {archiveReceipt
                  ? `SHARED WITH THE EXHIBITION ARCHIVE ✓ · ${archiveReceipt.entries} RESPONSE${archiveReceipt.entries === 1 ? '' : 'S'}`
                  : 'OPTIONAL · SHARES YOUR NAME AND WRITTEN ANSWERS WITH THE EXHIBITION ARCHIVE'}
              </p>
              {archiveError && <p className="rewind-export-error" role="alert">{archiveError}</p>}
            </div>

            <p className="rewind-privacy">
              {archiveReceipt
                ? 'FIELD NOTES MADE ON THIS DEVICE · YOUR ANSWERS ARE ALSO IN THE ARCHIVE'
                : 'MADE ON THIS DEVICE · NOT UPLOADED'}
            </p>
          </>
        ) : (
          <div className="rewind-empty">
            <p>No written trace saved.</p>
            <span>Looking and thinking were enough.</span>
          </div>
        )}
      </section>

      <div className="credits-copy">
        <section>
          <p>PRESENTED BY</p>
          <span>Padimai Art &amp; Tech Studio<br />Tanjong Pagar Distripark, Singapore</span>
        </section>
        <section>
          <p>CURATED, PROGRAMMED AND DESIGNED BY</p>
          <span>Kathleen Ditzig, Ryan Ho, Joshua Comaroff</span>
        </section>
      </div>

      <button type="button" className="credits-restart" onClick={onRestart}>START AGAIN</button>
    </article>
  )
}
