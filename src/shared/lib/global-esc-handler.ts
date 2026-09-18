
export function setupGlobalEscHandler(closeModal: () => void) {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      closeModal()
    }
  }

  // Capture phase (true) - triggers before any handlers
  document.addEventListener('keydown', handler, true)

  return () => {
    document.removeEventListener('keydown', handler, true)
  }
}
