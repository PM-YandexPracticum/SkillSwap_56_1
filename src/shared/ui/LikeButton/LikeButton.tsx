import { useCallback, type MouseEvent } from 'react'

export interface LikeButtonProps {
  liked: boolean
  onToggle?: (liked: boolean) => void
  className?: string
}

export const LikeButton = ({
  liked,
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
    width: '48px',
    height: '48px',
    padding: '8px',
    border: liked ? '1.5px solid #a8d08d' : '1.5px solid #e5e7eb',
    borderRadius: '50%',
    backgroundColor: liked ? 'rgb(168 208 141 / 12%)' : 'transparent',
    color: liked ? '#6b9e4e' : '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
  }

  const iconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: liked ? 'scale(1.15)' : 'scale(1)',
  }

  const heartStyle: React.CSSProperties = {
    stroke: 'currentColor',
    strokeWidth: '1.8',
    fill: liked ? '#a8d08d' : 'transparent',
    transition: 'fill 0.2s ease, stroke 0.2s ease',
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
      <svg
        style={iconStyle}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          style={heartStyle}
        />
      </svg>
    </button>
  )
}