import React from 'react'
import styles from './FilterChip.module.css'
import CrossSvg from '../../assets/cross.svg?react'

interface FilterChipProps {
  label: string
  showRemoveButton?: boolean
  onRemove?: () => void
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  showRemoveButton = true,
  onRemove = () => {},
}) => {
  return (
    <div className={styles.chip}>
      <span className={styles.label}>{label}</span>
      {showRemoveButton && (
        <button
          type="button"
          className={styles.removeButton}
          onClick={onRemove}
          aria-label={`Удалить фильтр ${label}`}
        >
          <CrossSvg />
        </button>
      )}
    </div>
  )
}
