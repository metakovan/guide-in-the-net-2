import type { ReflectionEntry } from './reflections'

type RewindGroup = {
  section: string
  source: string
  entries: ReflectionEntry[]
}

type CanvasFonts = {
  display: string
  body: string
}

const PAGE_WIDTH = 1240
const PAGE_HEIGHT = 1754
const PAGE_PADDING = 78
const PAGE_BOTTOM = 92
const BRAND_LOGO_SRC = '/guide/assets/upper-corner-logo-transparent.png'

function groupEntries(entries: ReflectionEntry[]): RewindGroup[] {
  const groups: RewindGroup[] = []

  entries.forEach((entry) => {
    const previous = groups.at(-1)
    if (previous && previous.section === entry.section && previous.source === entry.source) {
      previous.entries.push(entry)
      return
    }
    groups.push({ section: entry.section, source: entry.source, entries: [entry] })
  })

  return groups
}

function safeFileName(value: string) {
  const clean = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return clean || 'visitor'
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []

  text.split(/\n/).forEach((paragraph, paragraphIndex) => {
    const words = paragraph.trim().split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push('')
      return
    }

    let line = ''
    words.forEach((word) => {
      const candidate = line ? `${line} ${word}` : word
      if (context.measureText(candidate).width <= maxWidth) {
        line = candidate
        return
      }

      if (line) lines.push(line)

      if (context.measureText(word).width <= maxWidth) {
        line = word
        return
      }

      let fragment = ''
      Array.from(word).forEach((character) => {
        const fragmentCandidate = fragment + character
        if (context.measureText(fragmentCandidate).width > maxWidth && fragment) {
          lines.push(fragment)
          fragment = character
        } else {
          fragment = fragmentCandidate
        }
      })
      line = fragment
    })

    if (line) lines.push(line)
    if (paragraphIndex < text.split(/\n/).length - 1) lines.push('')
  })

  return lines
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
) {
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight))
  return y + lines.length * lineHeight
}

function drawBackground(context: CanvasRenderingContext2D, width: number, height: number, pageIndex = 0) {
  context.fillStyle = '#050806'
  context.fillRect(0, 0, width, height)

  context.fillStyle = 'rgba(42, 74, 255, 0.34)'
  const barY = [180, 498, 932, 1390]
  barY.forEach((base, index) => {
    const y = (base + pageIndex * 71 + index * 23) % Math.max(height - 30, 1)
    context.fillRect(index % 2 === 0 ? 0 : width * 0.42, y, index % 2 === 0 ? width * 0.7 : width * 0.58, 7)
  })

  context.fillStyle = 'rgba(169, 255, 67, 0.3)'
  for (let index = 0; index < 90; index += 1) {
    const x = (index * 173 + pageIndex * 91) % width
    const y = (index * 257 + pageIndex * 137) % height
    context.fillRect(x, y, index % 7 === 0 ? 3 : 1, index % 7 === 0 ? 3 : 1)
  }
}

function drawHeader(
  context: CanvasRenderingContext2D,
  visitorName: string,
  responseCount: number,
  fonts: CanvasFonts,
  brandLogo: HTMLImageElement | null,
  pageIndex: number,
  pageCount?: number,
) {
  const left = PAGE_PADDING
  let y = 92

  drawBrandLogo(context, brandLogo)

  context.fillStyle = '#a9ff43'
  context.font = `25px ${fonts.display}`
  context.letterSpacing = '2px'
  context.fillText('ISLANDS IN THE NET', left, y)

  y += 72
  context.fillStyle = '#ffffff'
  context.font = `60px ${fonts.display}`
  context.letterSpacing = '1px'
  context.fillText('FIELD NOTES FROM THE NET', left, y)

  y += 52
  context.fillStyle = 'rgba(255,255,255,.72)'
  context.font = `24px ${fonts.body}`
  context.letterSpacing = '0px'
  const pageLabel = pageCount ? ` · PAGE ${pageIndex + 1}/${pageCount}` : ''
  context.fillText(`${visitorName.toUpperCase()} · ${responseCount} RESPONSE${responseCount === 1 ? '' : 'S'}${pageLabel}`, left, y)

  context.fillStyle = '#3654ff'
  context.fillRect(left, y + 38, PAGE_WIDTH - PAGE_PADDING * 2, 4)
  return y + 84
}

function groupHeaderHeight() {
  return 88
}

function measureEntry(
  context: CanvasRenderingContext2D,
  entry: ReflectionEntry,
  fonts: CanvasFonts,
  width: number,
) {
  context.font = `30px ${fonts.body}`
  const promptLines = wrapText(context, entry.prompt, width)
  context.font = `32px ${fonts.body}`
  const answerLines = wrapText(context, entry.response, width)
  return {
    promptLines,
    answerLines,
    height: 38 + promptLines.length * 39 + 22 + answerLines.length * 44 + 55,
  }
}

function drawGroupHeader(
  context: CanvasRenderingContext2D,
  group: RewindGroup,
  y: number,
  fonts: CanvasFonts,
  continued = false,
) {
  context.fillStyle = '#a9ff43'
  context.font = `21px ${fonts.display}`
  context.letterSpacing = '1.5px'
  context.fillText(group.section.toUpperCase(), PAGE_PADDING, y + 22)

  context.fillStyle = 'rgba(255,255,255,.7)'
  context.font = `19px ${fonts.display}`
  context.letterSpacing = '1px'
  const source = `${group.source.replace(/\n/g, ' ')}${continued ? ' / CONT.' : ''}`
  context.fillText(source.toUpperCase(), PAGE_PADDING, y + 57)

  return y + groupHeaderHeight()
}

function drawEntry(
  context: CanvasRenderingContext2D,
  entry: ReflectionEntry,
  index: number,
  y: number,
  fonts: CanvasFonts,
  measured: ReturnType<typeof measureEntry>,
) {
  const contentX = PAGE_PADDING + 66
  const contentWidth = PAGE_WIDTH - PAGE_PADDING * 2 - 66

  context.fillStyle = 'rgba(169,255,67,.62)'
  context.font = `18px ${fonts.display}`
  context.letterSpacing = '1px'
  context.fillText(String(index + 1).padStart(2, '0'), PAGE_PADDING, y + 28)

  context.fillStyle = '#ffffff'
  context.font = `30px ${fonts.body}`
  context.letterSpacing = '0px'
  let nextY = drawWrappedText(context, measured.promptLines, contentX, y + 28, 39)

  nextY += 18
  context.fillStyle = '#f4e9c9'
  context.font = `32px ${fonts.body}`
  nextY = drawWrappedText(context, measured.answerLines, contentX, nextY, 44)

  context.fillStyle = 'rgba(54,84,255,.64)'
  context.fillRect(contentX, nextY + 27, contentWidth, 2)
  return y + measured.height
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('This browser could not create the rewind image.')
  return { canvas, context }
}

async function resolveFonts(): Promise<CanvasFonts> {
  if ('fonts' in document) {
    try {
      await document.fonts.ready
    } catch {
      // The fallback fonts below are intentionally safe.
    }
  }

  return {
    display: "'PxPlus IBM BIOS', 'Courier New', monospace",
    body: "Georgia, 'Times New Roman', serif",
  }
}

function loadBrandLogo() {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const logo = new Image()
    logo.onload = () => resolve(logo)
    logo.onerror = () => resolve(null)
    logo.src = BRAND_LOGO_SRC
  })
}

function drawBrandLogo(context: CanvasRenderingContext2D, logo: HTMLImageElement | null) {
  if (!logo?.naturalWidth || !logo.naturalHeight) return

  const height = 74
  const width = Math.min(230, logo.naturalWidth * (height / logo.naturalHeight))
  context.drawImage(logo, PAGE_WIDTH - PAGE_PADDING - width, 42, width, height)
}

function calculateContinuousHeight(
  context: CanvasRenderingContext2D,
  groups: RewindGroup[],
  fonts: CanvasFonts,
) {
  let height = 370
  groups.forEach((group) => {
    height += groupHeaderHeight()
    group.entries.forEach((entry) => {
      height += measureEntry(context, entry, fonts, PAGE_WIDTH - PAGE_PADDING * 2 - 66).height
    })
    height += 22
  })
  return Math.max(900, Math.ceil(height + 120))
}

function drawContinuousRewind(
  context: CanvasRenderingContext2D,
  visitorName: string,
  entries: ReflectionEntry[],
  groups: RewindGroup[],
  fonts: CanvasFonts,
  brandLogo: HTMLImageElement | null,
  height: number,
) {
  drawBackground(context, PAGE_WIDTH, height)
  let y = drawHeader(context, visitorName, entries.length, fonts, brandLogo, 0)
  let answerIndex = 0

  groups.forEach((group) => {
    y = drawGroupHeader(context, group, y, fonts)
    group.entries.forEach((entry) => {
      const measured = measureEntry(context, entry, fonts, PAGE_WIDTH - PAGE_PADDING * 2 - 66)
      y = drawEntry(context, entry, answerIndex, y, fonts, measured)
      answerIndex += 1
    })
    y += 22
  })

  context.fillStyle = 'rgba(255,255,255,.42)'
  context.font = `18px ${fonts.display}`
  context.letterSpacing = '1px'
  context.fillText('CREATED LOCALLY · NOTHING WAS UPLOADED', PAGE_PADDING, height - 62)
}

type PageInstruction = {
  group: RewindGroup
  entries: Array<{ entry: ReflectionEntry; measured: ReturnType<typeof measureEntry>; index: number }>
  continued: boolean
}

function paginate(
  context: CanvasRenderingContext2D,
  groups: RewindGroup[],
  fonts: CanvasFonts,
) {
  const pages: PageInstruction[][] = [[]]
  let pageIndex = 0
  let y = 340
  let answerIndex = 0
  const limit = PAGE_HEIGHT - PAGE_BOTTOM

  groups.forEach((group) => {
    let instruction: PageInstruction | null = null

    group.entries.forEach((entry, entryIndex) => {
      const measured = measureEntry(context, entry, fonts, PAGE_WIDTH - PAGE_PADDING * 2 - 66)
      const needsHeader = instruction === null
      const required = measured.height + (needsHeader ? groupHeaderHeight() : 0)

      if (y + required > limit && y > 340) {
        pageIndex += 1
        pages[pageIndex] = []
        y = 340
        instruction = null
      }

      if (!instruction) {
        instruction = {
          group,
          entries: [],
          continued: entryIndex > 0,
        }
        pages[pageIndex].push(instruction)
        y += groupHeaderHeight()
      }

      instruction.entries.push({ entry, measured, index: answerIndex })
      y += measured.height
      answerIndex += 1
    })

    y += 22
  })

  return pages
}

async function canvasToJpegBytes(canvas: HTMLCanvasElement, quality = 0.92) {
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => value ? resolve(value) : reject(new Error('Could not create the rewind image.')), 'image/jpeg', quality)
  })
  return new Uint8Array(await blob.arrayBuffer())
}

function ascii(value: string) {
  return new TextEncoder().encode(value)
}

function buildPdfFromJpegs(images: Array<{ bytes: Uint8Array; width: number; height: number }>) {
  const objectCount = 2 + images.length * 3
  const parts: Uint8Array[] = []
  const offsets = Array.from({ length: objectCount + 1 }, () => 0)
  let length = 0

  const push = (bytes: Uint8Array) => {
    parts.push(bytes)
    length += bytes.length
  }
  const pushText = (value: string) => push(ascii(value))
  const startObject = (number: number) => {
    offsets[number] = length
    pushText(`${number} 0 obj\n`)
  }

  pushText('%PDF-1.4\n')
  push(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a]))

  startObject(1)
  pushText('<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')

  const pageRefs = images.map((_, index) => `${3 + index * 3} 0 R`).join(' ')
  startObject(2)
  pushText(`<< /Type /Pages /Count ${images.length} /Kids [${pageRefs}] >>\nendobj\n`)

  images.forEach((image, index) => {
    const pageObject = 3 + index * 3
    const imageObject = pageObject + 1
    const contentObject = pageObject + 2
    const imageName = `Im${index + 1}`

    startObject(pageObject)
    pushText(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /${imageName} ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>\nendobj\n`)

    startObject(imageObject)
    pushText(`<< /Type /XObject /Subtype /Image /Width ${image.width} /Height ${image.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.bytes.length} >>\nstream\n`)
    push(image.bytes)
    pushText('\nendstream\nendobj\n')

    const content = `q\n595.28 0 0 841.89 0 0 cm\n/${imageName} Do\nQ\n`
    startObject(contentObject)
    pushText(`<< /Length ${ascii(content).length} >>\nstream\n${content}endstream\nendobj\n`)
  })

  const xrefOffset = length
  pushText(`xref\n0 ${objectCount + 1}\n`)
  pushText('0000000000 65535 f \n')
  for (let index = 1; index <= objectCount; index += 1) {
    pushText(`${String(offsets[index]).padStart(10, '0')} 00000 n \n`)
  }
  pushText(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  const output = new Uint8Array(length)
  let offset = 0
  parts.forEach((part) => {
    output.set(part, offset)
    offset += part.length
  })
  return new Blob([output], { type: 'application/pdf' })
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1200)
}

export async function downloadRewindAsJpg(visitorName: string, entries: ReflectionEntry[]) {
  if (entries.length === 0) throw new Error('There are no responses to export yet.')

  const [fonts, brandLogo] = await Promise.all([resolveFonts(), loadBrandLogo()])
  const groups = groupEntries(entries)
  const measurement = createCanvas(PAGE_WIDTH, 100)
  const height = calculateContinuousHeight(measurement.context, groups, fonts)
  const maxCanvasPixels = 14_000_000
  const scale = Math.min(1, Math.sqrt(maxCanvasPixels / (PAGE_WIDTH * height)))
  const { canvas, context } = createCanvas(Math.max(1, Math.floor(PAGE_WIDTH * scale)), Math.max(1, Math.floor(height * scale)))
  context.scale(scale, scale)
  drawContinuousRewind(context, visitorName, entries, groups, fonts, brandLogo, height)

  const bytes = await canvasToJpegBytes(canvas, 0.94)
  triggerDownload(new Blob([bytes], { type: 'image/jpeg' }), `islands-in-the-net-field-notes-${safeFileName(visitorName)}.jpg`)
}

export async function downloadRewindAsPdf(visitorName: string, entries: ReflectionEntry[]) {
  if (entries.length === 0) throw new Error('There are no responses to export yet.')

  const [fonts, brandLogo] = await Promise.all([resolveFonts(), loadBrandLogo()])
  const groups = groupEntries(entries)
  const measurement = createCanvas(PAGE_WIDTH, 100)
  const pages = paginate(measurement.context, groups, fonts)
  const images: Array<{ bytes: Uint8Array; width: number; height: number }> = []

  for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
    const { canvas, context } = createCanvas(PAGE_WIDTH, PAGE_HEIGHT)
    drawBackground(context, PAGE_WIDTH, PAGE_HEIGHT, pageIndex)
    let y = drawHeader(context, visitorName, entries.length, fonts, brandLogo, pageIndex, pages.length)

    pages[pageIndex].forEach((instruction) => {
      y = drawGroupHeader(context, instruction.group, y, fonts, instruction.continued)
      instruction.entries.forEach(({ entry, measured, index }) => {
        y = drawEntry(context, entry, index, y, fonts, measured)
      })
      y += 22
    })

    context.fillStyle = 'rgba(255,255,255,.42)'
    context.font = `18px ${fonts.display}`
    context.letterSpacing = '1px'
    context.fillText('CREATED LOCALLY · NOTHING WAS UPLOADED', PAGE_PADDING, PAGE_HEIGHT - 48)

    images.push({ bytes: await canvasToJpegBytes(canvas, 0.92), width: PAGE_WIDTH, height: PAGE_HEIGHT })
  }

  triggerDownload(buildPdfFromJpegs(images), `islands-in-the-net-field-notes-${safeFileName(visitorName)}.pdf`)
}
