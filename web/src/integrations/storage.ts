import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

/**
 * Media storage.
 *
 * - Local development: files go to `web/media/` (no settings needed).
 * - Production (docs/hosting-architecture.md): Amazon S3 in me-central-1, served through CloudFront.
 *   Turned on by setting S3_BUCKET. On EC2, credentials come from the instance's IAM role, so
 *   S3_ACCESS_KEY_ID / S3_SECRET_ACCESS_KEY are only needed outside AWS.
 * - MEDIA_PUBLIC_URL (e.g. https://cdn.example.com) makes file URLs point straight at the CDN
 *   instead of streaming files through the application.
 */
const bucket = process.env.S3_BUCKET
const publicUrl = process.env.MEDIA_PUBLIC_URL?.replace(/\/$/, '')
const prefix = process.env.S3_PREFIX ?? 'media'

export const isS3Enabled = Boolean(bucket)

export const storagePlugin = (): Plugin =>
  s3Storage({
    enabled: isS3Enabled,
    // keep the database schema identical whether or not S3 is switched on
    alwaysInsertFields: true,
    bucket: bucket ?? '',
    collections: {
      media: {
        prefix,
        ...(publicUrl
          ? {
              disablePayloadAccessControl: true as const,
              generateFileURL: ({ filename, prefix: p }) =>
                `${publicUrl}/${[p, filename].filter(Boolean).join('/')}`,
            }
          : {}),
      },
    },
    config: {
      region: process.env.S3_REGION || 'me-central-1',
      ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT, forcePathStyle: true } : {}),
      ...(process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY
        ? {
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID,
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
          }
        : {}),
    },
  })
