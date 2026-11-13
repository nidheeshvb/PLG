import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getAllPagePaths, getPageByPath, pathFromSegments } from '@/lib/payload'
import type { Media } from '@/payload-types'

import { EmptyPage } from './EmptyPage'

type Props = { params: Promise<{ slug?: string[] }> }

export async function generateStaticParams() {
  try {
    const paths = await getAllPagePaths()
    return paths.map((p) => ({ slug: p === '/' ? [] : p.slice(1).split('/') }))
  } catch {
    // database not reachable at build time: pages render on first request instead
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageByPath(pathFromSegments(slug))
  if (!page) return {}
  const image = typeof page.meta?.image === 'object' ? (page.meta.image as Media | null) : null
  const title = page.meta?.title || `${page.title} | PLG Acachet`
  return {
    title: { absolute: title },
    description: page.meta?.description || undefined,
    alternates: { canonical: page.path || '/' },
    openGraph: {
      title,
      description: page.meta?.description || undefined,
      url: page.path || '/',
      ...(image?.url ? { images: [image.url] } : {}),
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = await getPageByPath(pathFromSegments(slug))
  if (!page) notFound()
  const { isEnabled: preview } = await draftMode()

  return (
    <>
      {preview && <LivePreviewListener />}
      {page.layout?.length ? <RenderBlocks blocks={page.layout} /> : <EmptyPage title={page.title} />}
    </>
  )
}
