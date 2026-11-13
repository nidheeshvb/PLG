import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

/** Opened by the CMS "Preview" / live preview: switches on draft mode, then shows the page. */
export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path') || '/'
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET || !path.startsWith('/')) {
    return new Response('Preview link is invalid', { status: 403 })
  }
  ;(await draftMode()).enable()
  redirect(path)
}
