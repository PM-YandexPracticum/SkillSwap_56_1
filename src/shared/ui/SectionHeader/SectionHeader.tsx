import React from 'react'
import './SectionHeader.css'
import { Button } from '../button/Button'
import ChevronSvg from '../../assets/chevron-right.svg?react'

interface SectionHeaderProps {
  title: string
  showButton?: boolean
  onSeeAllClick?: () => void
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showButton = true,
  onSeeAllClick = () => {},
}) => {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>

      {showButton && (
        <Button
          variant='tertiary'
          className={`see-all-button`}
          onClick={onSeeAllClick}
        >
          <ChevronSvg />
          Смотреть все
        </Button>
      )}
    </div>
  )
}
