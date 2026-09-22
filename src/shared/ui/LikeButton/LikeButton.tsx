import { useCallback, type MouseEvent } from 'react'
import likeActive from './btn-like-active.svg'
import likeUnactive from './btn-like-unactive.svg'

export interface LikeButtonProps {
  liked: boolean
  count?: number
  onToggle?: (liked: boolean) => void
  className?: string
}

export const LikeButton = ({
  liked,
  count,
   onToggle,
  className = '',
}: LikeButtonProps) => {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()
      onToggle?.(!liked)
    },
    [liked, onToggle]
  )

    const buttonStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      padding: 0,
      border: 'none',
      backgroundColor: 'transparent',
      color: liked ? '#ABD27A' : '#253017',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      outline: 'none',
    }

  return (
    <button
      type="button"
      className={className}
      style={buttonStyle}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <img
        src={liked ? likeActive : likeUnactive}
        alt=""
        aria-hidden="true"
      />


      {count !== undefined && (
        <span style={{ minWidth: '1ch', textAlign: 'center', userSelect: 'none' }}>
          {count}
        </span>
      )}

    </button>
  )
}
