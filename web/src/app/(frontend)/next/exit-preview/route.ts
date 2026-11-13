import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Turns draft mode off again (visit /next/exit-preview?path=/). */
export async function GET(req: NextRequest) {
  ;(await draftMode()).disable()
  const path = req.nextUrl.searchParams.get('path') || '/'
  redirect(path.startsWith('/') ? path : '/')
}
