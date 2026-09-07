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

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ width: '20px', height: '20px' }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          style={{
            stroke: liked ? '#a8d08d' : 'currentColor',
            strokeWidth: '1.8',
            fill: liked ? '#a8d08d' : 'transparent',
            transition: 'fill 0.2s ease, stroke 0.2s ease',
          }}
        />
      </svg>
    </button>
  )
}