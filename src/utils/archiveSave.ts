import type { ReflectionEntry } from './reflections'

// Opt-in save of the visitor's written answers to the exhibition archive (the islandsinthenet service,
// POST /visitors/reflections). Everything else in the guide stays on-device; this runs only when the
// visitor taps the archive button, and sends ONLY their self-chosen name + written answers.

const ARCHIVE_UUID_KEY = 'iitn-guide-archive-uuid'
const ARCHIVE_RECEIPT_KEY = 'iitn-guide-archive-receipt-v1'
const ARCHIVE_ENDPOINT = '/visitors/reflections'
const GUIDE_VERSION = '0.8.0'

export type ArchiveReceipt = {
  savedAt: string
  entries: number
}

function randomUuid(): string {
  const c = globalThis.crypto
  if (typeof c.randomUUID === 'function') return c.randomUUID()
  const bytes = new Uint8Array(16)
  c.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

// One stable uuid per device — a re-save supersedes this visitor's earlier copy instead of duplicating.
function archiveUuid(): string {
  try {
    const existing = localStorage.getItem(ARCHIVE_UUID_KEY)
    if (existing) return existing
  } catch {
    // Storage unavailable: a fresh uuid per save still works (each save is its own record).
  }
  const uuid = randomUuid()
  try {
    localStorage.setItem(ARCHIVE_UUID_KEY, uuid)
  } catch {
    // Best-effort persistence only.
  }
  return uuid
}

export function readArchiveReceipt(): ArchiveReceipt | null {
  try {
    const stored = localStorage.getItem(ARCHIVE_RECEIPT_KEY)
    if (!stored) return null
    const parsed: unknown = JSON.parse(stored)
    if (parsed && typeof parsed === 'object' && typeof (parsed as ArchiveReceipt).savedAt === 'string') {
      return parsed as ArchiveReceipt
    }
  } catch {
    // Fall through — no receipt.
  }
  return null
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function saveToArchive(visitorName: string, entries: ReflectionEntry[]): Promise<ArchiveReceipt> {
  if (entries.length === 0) throw new Error('There are no written answers to share yet.')

  const body = JSON.stringify({
    uuid: archiveUuid(),
    guest_name: visitorName,
    completed_at: new Date().toISOString(),
    guide_version: GUIDE_VERSION,
    entries: entries.map(({ section, source, prompt, response, order }) => ({
      section, source, prompt, response, order,
    })),
  })

  let delay = 900
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let response: Response | null = null
    try {
      response = await fetch(ARCHIVE_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
      })
    } catch {
      response = null // network failure — retry
    }
    if (response) {
      if (response.status === 200) {
        const d = await response.json().catch(() => null)
        if (d?.ok) {
          const receipt: ArchiveReceipt = { savedAt: d.saved_at, entries: d.entries }
          try {
            localStorage.setItem(ARCHIVE_RECEIPT_KEY, JSON.stringify(receipt))
          } catch {
            // The save itself succeeded; the receipt is a convenience.
          }
          return receipt
        }
      }
      if (response.status >= 400 && response.status < 500 && response.status !== 409) {
        const e = await response.json().catch(() => ({}) as { error?: string })
        throw new Error(e.error || 'The archive could not accept this save.')
      }
      // 409 / 5xx — retry below.
    }
    await sleep(delay + Math.random() * 300)
    delay = Math.min(delay * 1.8, 5000)
  }
  throw new Error('The archive could not be reached — please try again.')
}
