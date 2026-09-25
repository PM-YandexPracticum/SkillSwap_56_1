import React from 'react'
import './SectionHeader.css'
import { Button } from '../button/Button'
import ChevronSvg from '../../assets/chevron-right.svg?react'

interface SectionHeaderProps {
  title: string
  showButton?: boolean
  buttonText?: string
  onSeeAllClick?: () => void
  isExpanded?: boolean
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showButton = true,
  buttonText = 'Смотреть все',
  onSeeAllClick = () => {},
  isExpanded = false,
}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>

      {showButton && (
        <Button
          variant="tertiary"
          className="see-all-button"
          onClick={onSeeAllClick}
        >
          <span
            className={`see-all-icon${isExpanded ? ' see-all-icon--expanded' : ''}`}
          >
            <ChevronSvg />
          </span>
          {buttonText}
        </Button>
      )}
    </div>
  )
}
