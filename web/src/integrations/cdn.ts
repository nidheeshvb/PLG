import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
import type { Payload } from 'payload'

/**
 * CDN refresh. CloudFront caches whole pages (docs/hosting-architecture.md), so after a publish the
 * cached copy at the CDN must be cleared as well as Next.js's own cache.
 * Turned on by setting CLOUDFRONT_DISTRIBUTION_ID. On EC2 the instance role needs
 * `cloudfront:CreateInvalidation` on that distribution.
 */
const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID
let client: CloudFrontClient | null = null

export const invalidateCdn = async (paths: string[], logger?: Payload['logger']) => {
  if (!distributionId || !paths.length) return
  client ??= new CloudFrontClient({}) // CloudFront is global; region is not needed
  const items = [...new Set(paths)]
  try {
    await client.send(
      new CreateInvalidationCommand({
        DistributionId: distributionId,
        InvalidationBatch: {
          CallerReference: `payload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          Paths: { Quantity: items.length, Items: items },
        },
      }),
    )
    logger?.info({ paths: items }, 'CloudFront invalidation requested')
  } catch (err) {
    logger?.error({ err, paths: items }, 'CloudFront invalidation failed')
  }
}
