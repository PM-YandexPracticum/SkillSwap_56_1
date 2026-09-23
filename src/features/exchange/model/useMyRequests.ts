import { useCallback, useEffect, useState } from 'react'
import type { SwapRequest } from '@/shared/types'
import { getAuthUser } from '@/features/auth/model/authUtils'
import {
  acceptExchangeRequest,
  completeExchangeRequest,
  getExchangeRequests,
  rejectExchangeRequest,
} from './exchangeRequestsStorage'

interface MyRequests {
  /** Заявки, адресованные текущему пользователю */
  incoming: SwapRequest[]
  /** Заявки, отправленные текущим пользователем */
  outgoing: SwapRequest[]
}

const EMPTY_REQUESTS: MyRequests = { incoming: [], outgoing: [] }

function splitByUser(requests: SwapRequest[], userId: string): MyRequests {
  return {
    incoming: requests.filter((request) => request.toUserId === userId),
    outgoing: requests.filter((request) => request.fromUserId === userId),
  }
}

/**
 * Читает заявки текущего пользователя из localStorage и даёт действия
 * для принятия/отклонения/завершения обмена. Обновляет состояние
 * без перезагрузки страницы.
 */
export function useMyRequests() {
  const [authUserId] = useState(() => getAuthUser()?.id ?? null)
  const [requests, setRequests] = useState<MyRequests>(EMPTY_REQUESTS)

  const refresh = useCallback(() => {
    if (!authUserId) {
      setRequests(EMPTY_REQUESTS)
      return
    }

    setRequests(splitByUser(getExchangeRequests(), authUserId))
  }, [authUserId])

  useEffect(() => {
    refresh()
  }, [refresh])

  const accept = useCallback(
    (id: string) => {
      acceptExchangeRequest(id)
      refresh()
    },
    [refresh],
  )

  const reject = useCallback(
    (id: string) => {
      rejectExchangeRequest(id)
      refresh()
    },
    [refresh],
  )

  const complete = useCallback(
    (id: string) => {
      completeExchangeRequest(id)
      refresh()
    },
    [refresh],
  )

  return { ...requests, accept, reject, complete }
}
