
export function setupGlobalEscHandler(closeModal: () => void) {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      closeModal()
    }
  }

  document.addEventListener('keydown', handler, true)

  return () => {
    document.removeEventListener('keydown', handler, true)
  }
}
