import { useCallback, useState } from 'react'
import { getAuthUser } from '@/features/auth/model/authUtils'
import { createExchangeRequest, findExchangeRequest } from './exchangeRequestsStorage'

export type ExchangeModal = 'none' | 'registrationRequired' | 'created'

interface UseProposeExchangeParams {
  skillId: string
  toUserId: string
}

interface UseProposeExchangeResult {
  /** Обмен по этому навыку уже предложен текущим пользователем */
  isProposed: boolean
  /** Какое модальное окно сейчас нужно показать */
  modal: ExchangeModal
  /** Обработчик клика на «Предложить обмен» */
  proposeExchange: () => void
  /** Закрыть текущее модальное окно */
  closeModal: () => void
}

/**
 * Логика кнопки «Предложить обмен» на странице навыка:
 * — гостю показывает RegistrationRequiredModal;
 * — авторизованному пользователю имитирует отправку предложения
 *   (сохраняет запрос в localStorage) и показывает подтверждение;
 * — повторный клик не создаёт дубликат запроса.
 */
export function useProposeExchange({
  skillId,
  toUserId,
}: UseProposeExchangeParams): UseProposeExchangeResult {
  const [isProposed, setIsProposed] = useState<boolean>(() => {
    const authUser = getAuthUser()
    if (!authUser) return false
    return Boolean(findExchangeRequest(skillId, authUser.id, toUserId))
  })
  const [modal, setModal] = useState<ExchangeModal>('none')

  const proposeExchange = useCallback(() => {
    if (isProposed) return

    const authUser = getAuthUser()
    if (!authUser) {
      setModal('registrationRequired')
      return
    }

    createExchangeRequest(skillId, authUser.id, toUserId)
    setIsProposed(true)
    setModal('created')
  }, [isProposed, skillId, toUserId])

  const closeModal = useCallback(() => setModal('none'), [])

  return { isProposed, modal, proposeExchange, closeModal }
}
