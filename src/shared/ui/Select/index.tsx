import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface CommonSelectProps {
  label?: string
  placeholder?: string
  options: SelectOption[]
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  emptyMessage?: string
  className?: string
}

interface SingleSelectProps extends CommonSelectProps {
  multiple?: false
  value: string | null
  onChange: (value: string | null) => void
}

interface MultipleSelectProps extends CommonSelectProps {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

export type SelectProps = SingleSelectProps | MultipleSelectProps

export function Select(props: SelectProps) {
  const {
    label,
    placeholder = 'Выберите значение',
    options,
    searchable = false,
    clearable = searchable,
    disabled = false,
    emptyMessage = 'Ничего не найдено',
    className,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const fieldRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (fieldRef.current && !fieldRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchable) {
      setQuery('')
      inputRef.current?.focus()
    }
  }, [isOpen, searchable])

  const selectedValues = props.multiple ? props.value : props.value ? [props.value] : []
  const selectedOptions = options.filter((option) => selectedValues.includes(option.value))
  const hasValue = selectedValues.length > 0

  const filteredOptions = searchable
    ? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
    : options

  const triggerLabel = props.multiple
    ? hasValue
      ? `Выбрано: ${props.value.length}`
      : placeholder
    : (selectedOptions[0]?.label ?? placeholder)

  function handleTriggerClick() {
    if (disabled) return
    setIsOpen((value) => !value)
  }

  function selectOption(option: SelectOption) {
    if (props.multiple) {
      const isSelected = props.value.includes(option.value)
      const nextValue = isSelected
        ? props.value.filter((value) => value !== option.value)
        : [...props.value, option.value]
      props.onChange(nextValue)
      return
    }

    props.onChange(option.value)
    setIsOpen(false)
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setQuery('')
    if (props.multiple) {
      props.onChange([])
    } else {
      props.onChange(null)
    }
    inputRef.current?.focus()
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.field} ref={fieldRef}>
        <div className={[styles.control, isOpen && styles.controlOpen].filter(Boolean).join(' ')}>
          {searchable ? (
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              placeholder={placeholder}
              value={isOpen ? query : (selectedOptions[0]?.label ?? '')}
              disabled={disabled}
              onFocus={() => setIsOpen(true)}
              onChange={(event) => setQuery(event.target.value)}
            />
          ) : (
            <button
              type="button"
              className={styles.trigger}
              disabled={disabled}
              onClick={handleTriggerClick}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
            >
              <span className={[styles.triggerText, !hasValue && styles.placeholder].filter(Boolean).join(' ')}>
                {triggerLabel}
              </span>
              <span className={[styles.chevron, isOpen && styles.chevronOpen].filter(Boolean).join(' ')} aria-hidden="true">
                <ChevronIcon />
              </span>
            </button>
          )}

          {clearable && hasValue && (
            <button type="button" className={styles.clearButton} aria-label="Очистить" onClick={handleClear}>
              ×
            </button>
          )}

          {searchable && (
            <span className={[styles.chevron, isOpen && styles.chevronOpen].filter(Boolean).join(' ')} aria-hidden="true">
              <ChevronIcon />
            </span>
          )}
        </div>

        {isOpen && (
          <ul className={styles.dropdown} role="listbox" aria-multiselectable={props.multiple}>
            {filteredOptions.length === 0 && <li className={styles.empty}>{emptyMessage}</li>}

            {filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value)

              return (
                <li key={option.value}>
                  <button
                    type="button"
                    className={[styles.option, isSelected && styles.optionSelected].filter(Boolean).join(' ')}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectOption(option)}
                  >
                    {props.multiple && (
                      <span
                        className={[styles.checkbox, isSelected && styles.checkboxChecked].filter(Boolean).join(' ')}
                        aria-hidden="true"
                      >
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                    <span>{option.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

function ChevronIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
