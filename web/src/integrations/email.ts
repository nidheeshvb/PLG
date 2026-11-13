import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import type { EmailAdapter } from 'payload'

/**
 * Outgoing email (CMS password resets now; form notifications later).
 * Any SMTP service works; on AWS use Amazon SES's SMTP endpoint in the same region.
 * Turned on by setting SMTP_HOST. Without it, Payload prints emails to the console.
 */
export const emailAdapter = (): Promise<EmailAdapter> | undefined => {
  if (!process.env.SMTP_HOST) return undefined
  return nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'no-reply@example.com',
    defaultFromName: process.env.EMAIL_FROM_NAME || 'PLG Acachet',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    },
  }) as Promise<EmailAdapter>
}
