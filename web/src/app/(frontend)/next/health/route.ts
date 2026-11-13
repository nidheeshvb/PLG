import { sql } from '@payloadcms/db-postgres'

import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/**
 * Health check for monitoring (CloudWatch / Route 53 health checks, load balancers).
 * 200 = app and database reachable; 503 otherwise. Must not be cached by the CDN.
 */
export async function GET() {
  const started = Date.now()
  try {
    const payload = await getPayloadClient()
    await payload.db.drizzle.execute(sql`select 1`)
    return Response.json(
      { status: 'ok', db: 'ok', ms: Date.now() - started },
      { headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return Response.json(
      { status: 'error', db: 'unreachable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
