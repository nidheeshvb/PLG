import Link from 'next/link'

import type { BlockContext } from '@/blocks/context'
import { Breadcrumb } from '@/blocks/Hero/variants/PageHero'
import { CMSLink } from '@/components/ui/CMSLink'
import { MultilineText } from '@/components/ui/MultilineText'
import { RichText } from '@/components/ui/RichText'
import { StickyBar } from '@/components/ui/StickyBar/StickyBar'
import { toSlug } from '@/fields/slug'
import { getSiteSettings } from '@/lib/payload'
import type { LegalDocumentBlock as LegalDocumentBlockData, Page } from '@/payload-types'

import styles from './Component.module.css'
import { PreferencesButton, TocNav } from './LegalClient'

const two = (n: number) => String(n).padStart(2, '0')
const CATEGORY: Record<string, [string, string]> = {
  necessary: ['Strictly necessary', styles.catNec],
  analytics: ['Analytics', styles.catAna],
  functional: ['Functional', styles.catFun],
  marketing: ['Marketing', styles.catMkt],
}

/** Title with the last word in orange. */
function Title({ text }: { text: string }) {
  const t = text.trim()
  const cut = t.lastIndexOf(' ')
  return (
    <>
      {cut > 0 ? `${t.slice(0, cut)} ` : null}
      <em>{cut > 0 ? t.slice(cut + 1) : t}</em>
    </>
  )
}

/** Legal document: header with facts, document switcher (sticky), contents + numbered sections, questions box, other documents. */
export async function LegalDocumentBlock(props: LegalDocumentBlockData & BlockContext) {
  const { title, subtitle, facts, showBrandMark, switcherLabel, documents, noticeTitle, noticeText, noticePoints, intro } = props
  const { sections, askTitle, askLink, anchorId, page } = props
  const { company } = await getSiteSettings()
  const docs = (documents ?? []).filter((d): d is Page => typeof d === 'object' && d !== null && Boolean(d.path))
  const others = docs.filter((d) => d.path !== page?.path)
  const key = page?.path?.split('/').filter(Boolean).pop() ?? 'doc'
  const secs = (sections ?? []).map((s, i) => ({ ...s, n: two(i + 1), sid: `${key}-${i + 1}-${toSlug(s.title)}` }))
  const contactCard = company?.address || company?.email || company?.phone
  const tel = company?.phone ? `tel:${company.phone.replace(/[^\d+]/g, '')}` : null

  return (
    <>
      <section className={styles.lhero} aria-labelledby="docTitle">
        {showBrandMark && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.mark} src="/brand/brand-mark.svg" alt="" fetchPriority="high" decoding="async" />
        )}
        <div className={styles.lheroInner}>
          <Breadcrumb page={page} />
          <h1 className={styles.t} id="docTitle">
            <Title text={title} />
          </h1>
          {subtitle && <p className={styles.sub}>{subtitle}</p>}
          {!!facts?.length && (
            <dl className={styles.facts}>
              {facts.map((f, i) => (
                <div key={f.id ?? i}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {docs.length > 0 && (
        <StickyBar label="Legal documents" variant="tabs">
          {switcherLabel && <span className={styles.k}>{switcherLabel}</span>}
          {docs.map((d) => (
            <Link key={d.id} href={d.path as string} aria-current={d.path === page?.path ? 'page' : undefined}>
              {d.title}
            </Link>
          ))}
        </StickyBar>
      )}

      <section id={anchorId || 'doc'} className={styles.ldoc} data-nav-tone="light">
        <div className={styles.inner}>
          <aside className={styles.toc} aria-label="On this page">
            <p className={styles.tocK}>On this page</p>
            <TocNav items={secs.map((s) => ({ id: s.sid, n: s.n, title: s.title }))} />
          </aside>
          <article className={styles.art}>
            <div className={styles.view}>
              {noticeTitle && (
                <div className={styles.counsel} role="note">
                  <span className={styles.counselIc} aria-hidden="true">
                    !
                  </span>
                  <div>
                    <b>{noticeTitle}</b>
                    {noticeText && <p>{noticeText}</p>}
                    {!!noticePoints?.length && (
                      <ul>
                        {noticePoints.map((p, i) => (
                          <li key={p.id ?? i}>{p.text}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
              {intro && <p className={styles.intro}>{intro}</p>}
              {secs.map((s, i) => (
                <section key={s.id ?? i} id={s.sid} className={[styles.sec, s.highlight && styles.secKey].filter(Boolean).join(' ')}>
                  <h2>
                    <span>{s.n}</span>
                    {s.title}
                  </h2>
                  {s.mustLabel && (
                    <p className={styles.must}>
                      <b>{s.mustLabel}</b>
                      {s.mustNote}
                    </p>
                  )}
                  <RichText data={s.body} className={styles.body} />
                  {!!s.cookieTable?.length && (
                    <div className={styles.tbl}>
                      <table>
                        <thead>
                          <tr>
                            {['Cookie', 'Provider', 'Purpose', 'Category', 'Duration'].map((h) => (
                              <th key={h} scope="col">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.cookieTable.map((c, k) => {
                            const [label, cls] = CATEGORY[c.category ?? 'necessary'] ?? CATEGORY.necessary
                            return (
                              <tr key={c.id ?? k}>
                                <td>{c.name}</td>
                                <td>{c.provider}</td>
                                <td>{c.purpose}</td>
                                <td>
                                  <span className={`${styles.cat} ${cls}`}>{label}</span>
                                </td>
                                <td>{c.duration}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {s.showContactCard && contactCard && (
                    <address className={styles.addr}>
                      <b>{company?.name}</b>
                      <span>
                        <MultilineText text={company?.address} />
                      </span>
                      <span>
                        {company?.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
                        {company?.email && tel && <br />}
                        {tel && <a href={tel}>{company?.phone}</a>}
                      </span>
                    </address>
                  )}
                  {s.showPreferencesButton && <PreferencesButton />}
                </section>
              ))}

              {askTitle && (
                <div className={styles.ask}>
                  <div>
                    <h3>{askTitle}</h3>
                    {(company?.email || tel) && (
                      <p>
                        {company?.email && (
                          <>
                            Write to <a href={`mailto:${company.email}`}>{company.email}</a>,{' '}
                          </>
                        )}
                        {tel && (
                          <>
                            call <a href={tel}>{company?.phone}</a>,{' '}
                          </>
                        )}
                        or use the contact form.
                      </p>
                    )}
                  </div>
                  <CMSLink link={askLink} />
                </div>
              )}

              {others.length > 0 && (
                <div className={styles.rel}>
                  {others.map((d) => (
                    <Link key={d.id} href={d.path as string}>
                      <span>
                        <small>{d.path}</small>
                        <b>{d.title}</b>
                      </span>
                      <i aria-hidden="true">
                        <span className="arr" />
                      </i>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
