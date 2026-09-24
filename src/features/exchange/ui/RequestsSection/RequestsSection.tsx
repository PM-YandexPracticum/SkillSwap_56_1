import { useEffect, useState } from 'react'
import type { Skill, SwapRequest, User } from '@/shared/types'
import { fetchSkillById } from '@/api/skills'
import { fetchUserById } from '@/api/users'
import { useMyRequests } from '@/features/exchange/model/useMyRequests'
import { Button } from '@/shared/ui/button/Button'
import styles from './RequestsSection.module.css'

const STATUS_LABELS: Record<SwapRequest['status'], string> = {
  pending: 'Ожидает подтверждения',
  accepted: 'Принята',
  inProgress: 'В работе',
  rejected: 'Отклонена',
  done: 'Завершена',
}

interface EnrichedRequest {
  request: SwapRequest
  skill: Skill | undefined
  counterpart: User | undefined
}

function useEnrichedRequests(
  requests: SwapRequest[],
  counterpartField: 'fromUserId' | 'toUserId',
): EnrichedRequest[] {
  const [enriched, setEnriched] = useState<EnrichedRequest[]>([])

  useEffect(() => {
    let cancelled = false

    Promise.all(
      requests.map(async (request) => {
        const [skill, counterpart] = await Promise.all([
          fetchSkillById(request.skillId),
          fetchUserById(request[counterpartField]),
        ])

        return { request, skill, counterpart }
      }),
    ).then((result) => {
      if (!cancelled) setEnriched(result)
    })

    return () => {
      cancelled = true
    }
  }, [requests, counterpartField])

  return enriched
}

interface RequestCardProps {
  entry: EnrichedRequest
  counterpartLabel: string
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
  onComplete?: (id: string) => void
}

function RequestCard({ entry, counterpartLabel, onAccept, onReject, onComplete }: RequestCardProps) {
  const { request, skill, counterpart } = entry

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <span className={styles.skillTitle}>{skill?.title ?? 'Навык удалён'}</span>
        <span className={styles.counterpart}>
          {counterpartLabel} {counterpart?.name ?? 'пользователь'}
        </span>
        <span className={styles.status}>{STATUS_LABELS[request.status]}</span>
      </div>

      <div className={styles.actions}>
        {request.status === 'pending' && onAccept && onReject && (
          <>
            <Button variant="primary" onClick={() => onAccept(request.id)}>
              Принять
            </Button>
            <Button
              variant="secondary"
              onClick={() => onReject(request.id)}
            >
              Отклонить
            </Button>
          </>
        )}

        {request.status === 'inProgress' && onComplete && (
          <Button
            variant="primary"
            onClick={() => onComplete(request.id)}
          >
            Завершить обмен
          </Button>
        )}
      </div>
    </div>
  )
}

export function RequestsSection() {
  const { incoming, outgoing, accept, reject, complete } = useMyRequests()
  const enrichedIncoming = useEnrichedRequests(incoming, 'fromUserId')
  const enrichedOutgoing = useEnrichedRequests(outgoing, 'toUserId')

  if (incoming.length === 0 && outgoing.length === 0) {
    return <p className={styles.empty}>У вас пока нет заявок на обмен</p>
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <h2 className={styles.groupTitle}>Входящие заявки</h2>
        {enrichedIncoming.length === 0 && <p className={styles.empty}>Нет входящих заявок</p>}
        {enrichedIncoming.map((entry) => (
          <RequestCard
            key={entry.request.id}
            entry={entry}
            counterpartLabel="от"
            onAccept={accept}
            onReject={reject}
            onComplete={complete}
          />
        ))}
      </div>

      <div className={styles.group}>
        <h2 className={styles.groupTitle}>Исходящие заявки</h2>
        {enrichedOutgoing.length === 0 && <p className={styles.empty}>Нет исходящих заявок</p>}
        {enrichedOutgoing.map((entry) => (
          <RequestCard key={entry.request.id} entry={entry} counterpartLabel="для" onComplete={complete} />
        ))}
      </div>
    </div>
  )
}
