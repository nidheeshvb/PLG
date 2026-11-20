'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './Application.module.css'

export type SelectOption = { value: string; label: string }

type Props = {
  id: string
  name: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  /** Required selects show their empty first option ("Choose one") greyed out. */
  required?: boolean
  labelledBy: string
  /** id of the error text to read out when the choice is flagged (E2E-8-2) */
  errorId?: string
}

const CHEVRON = (
  <svg viewBox="0 0 10 10" aria-hidden="true">
    <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M1 3.2l4 4 4-4" />
  </svg>
)

/**
 * Styled dropdown (button + listbox) like the prototype's apply form. The value is submitted
 * through a hidden input with `name`. Keyboard: arrows open and move, Enter/Space pick, Esc closes.
 */
export function Select({ id, name, options, value, onChange, required, labelledBy, errorId }: Props) {
  const [open, setOpen] = useState(false)
  const [hl, setHl] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const selected = Math.max(0, options.findIndex((o) => o.value === value))
  const listId = `${id}-list`

  // close when clicking anywhere else
  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [open])

  // keep the highlighted option in view
  useEffect(() => {
    if (open) listRef.current?.children[hl]?.scrollIntoView({ block: 'nearest' })
  }, [open, hl])

  const show = () => {
    setHl(selected)
    setOpen(true)
  }
  const pick = (i: number) => {
    onChange(options[i]?.value ?? '')
    setOpen(false)
    btnRef.current?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    const n = options.length
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) show()
      else setHl((hl + (e.key === 'ArrowDown' ? 1 : -1) + n) % n)
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault()
      pick(hl)
    } else if (e.key === 'Escape' && open) {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') setOpen(false)
  }

  return (
    <div ref={wrapRef} className={[styles.sel, open && styles.selOpen].filter(Boolean).join(' ')}>
      <button
        ref={btnRef}
        type="button"
        id={id}
        className={[styles.selBtn, required && !value && styles.isPh].filter(Boolean).join(' ')}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelledBy} ${id}`}
        aria-activedescendant={open ? `${listId}-${hl}` : undefined}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
      >
        <span>{options[selected]?.label}</span>
        <i>{CHEVRON}</i>
      </button>
      <ul ref={listRef} className={styles.selList} id={listId} role="listbox" aria-labelledby={labelledBy}>
        {options.map((o, i) => (
          <li
            key={o.value || '_empty'}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === selected}
            className={[styles.selOpt, i === hl && open && styles.isHl].filter(Boolean).join(' ')}
            onClick={() => pick(i)}
            onPointerMove={() => i !== hl && setHl(i)}
          >
            {o.label}
          </li>
        ))}
      </ul>
      <input type="hidden" name={name} value={value} />
    </div>
  )
}
