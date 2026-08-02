import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Format any common date value as dd-mm-yyyy for display. */
export function formatDate(input: string | Date | null | undefined): string {
  if (input == null || input === '') return ''

  if (input instanceof Date) {
    if (Number.isNaN(input.getTime())) return ''
    return `${pad2(input.getDate())}-${pad2(input.getMonth() + 1)}-${input.getFullYear()}`
  }

  const raw = String(input).trim()
  if (!raw || raw === '-') return raw

  // Already dd-mm-yyyy (optionally with time suffix)
  if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) return raw
  const alreadyWithTime = raw.match(/^(\d{2}-\d{2}-\d{4})(\s+at\s+.+)$/i)
  if (alreadyWithTime) return raw

  // YYYY-MM-DD or YYYY-M-D
  const iso = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (iso) {
    return `${pad2(Number(iso[3]))}-${pad2(Number(iso[2]))}-${iso[1]}`
  }

  // DD Mon YYYY / D Mon YYYY (e.g. 05 Jun 2026, 19 May 2026)
  const dayMonYear = raw.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})$/)
  if (dayMonYear) {
    const month = monthNameToNumber(dayMonYear[2])
    if (month) return `${pad2(Number(dayMonYear[1]))}-${pad2(month)}-${dayMonYear[3]}`
  }

  // Mon DD, YYYY / Month D, YYYY (e.g. May 15, 2026 / January 10, 2026)
  const monDayYear = raw.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/)
  if (monDayYear) {
    const month = monthNameToNumber(monDayYear[1])
    if (month) return `${pad2(Number(monDayYear[2]))}-${pad2(month)}-${monDayYear[3]}`
  }

  // Mon DD, YYYY at time… → keep time suffix
  const withTime = raw.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})(\s+at\s+.+)$/i)
  if (withTime) {
    const month = monthNameToNumber(withTime[1])
    if (month) {
      return `${pad2(Number(withTime[2]))}-${pad2(month)}-${withTime[3]}${withTime[4]}`
    }
  }

  // Fallback: Date.parse
  const parsed = new Date(raw)
  if (!Number.isNaN(parsed.getTime())) {
    return `${pad2(parsed.getDate())}-${pad2(parsed.getMonth() + 1)}-${parsed.getFullYear()}`
  }

  return raw
}

/** Today's date as dd-mm-yyyy */
export function todayDisplayDate(): string {
  return formatDate(new Date())
}

function monthNameToNumber(name: string): number | null {
  const key = name.slice(0, 3).toLowerCase()
  const map: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  }
  return map[key] ?? null
}
