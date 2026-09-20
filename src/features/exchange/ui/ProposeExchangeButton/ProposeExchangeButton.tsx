import { useNavigate } from 'react-router-dom'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { ROUTES } from '@/shared/lib/constants'
import { useProposeExchange } from '@/features/exchange/model/useProposeExchange'
import { RegistrationRequiredModal } from '@/features/exchange/ui/RegistrationRequiredModal'
import { ExchangeCreatedModal } from '@/features/exchange/ui/ExchangeCreatedModal'
import clockUrl from '@/shared/assets/clock.svg'
import styles from './ProposeExchangeButton.module.css'

interface ProposeExchangeButtonProps {
  /** Идентификатор навыка, на который предлагается обмен */
  skillId: string
  /** Идентификатор автора навыка (кому предлагается обмен) */
  toUserId: string
}

export const ProposeExchangeButton = ({ skillId, toUserId }: ProposeExchangeButtonProps) => {
  const navigate = useNavigate()
  const { isProposed, modal, proposeExchange, closeModal } = useProposeExchange({
    skillId,
    toUserId,
  })

  return (
    <>
      {isProposed ? (
        <Button
          text="Обмен предложен"
          icon={<img src={clockUrl} alt="" className={styles.clockIcon} />}
          className={`${buttonStyles.secondary} ${styles.pendingButton}`}
          isDisabled
        />
      ) : (
        <Button
          text="Предложить обмен"
          className={buttonStyles.primary}
          style={{ width: '100%' }}
          onClick={proposeExchange}
        />
      )}

      {modal === 'registrationRequired' && (
        <RegistrationRequiredModal
          onClose={closeModal}
          onRegisterClick={() => navigate(ROUTES.REGISTER)}
        />
      )}

      {modal === 'created' && <ExchangeCreatedModal onClose={closeModal} />}
    </>
  )
}
