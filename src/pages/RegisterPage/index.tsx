import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegistrationStepOne } from '@/features/auth/ui/RegistrationStepOne'
import { RegistrationStepTwo } from '@/features/auth/ui/RegistrationStepTwo'
import { RegistrationStepThree } from '@/features/auth/ui/RegistrationStepThree'
import { saveAuthUser } from '@/features/auth/model/authUtils'
import { ROUTES } from '@/shared/lib/constants'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleStepOneNext = (emailValue: string) => {
    setEmail(emailValue)
    setStep(2)
  }

  const handleStepTwoNext = (nameValue: string) => {
    setName(nameValue)
    setStep(3)
  }

  const handleComplete = () => {
    saveAuthUser({
      id: crypto.randomUUID(),
      name: name || email.split('@')[0] || 'Пользователь',
      email,
    })
    navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <>
      <div style={{ display: step === 1 ? 'block' : 'none' }}>
        <RegistrationStepOne
          mode="register"
          onNext={handleStepOneNext}
        />
      </div>
      <div style={{ display: step === 2 ? 'block' : 'none' }}>
        <RegistrationStepTwo
          onBack={() => setStep(1)}
          onNext={handleStepTwoNext}
        />
      </div>
      <div style={{ display: step === 3 ? 'block' : 'none' }}>
        <RegistrationStepThree
          onBack={() => setStep(2)}
          onComplete={handleComplete}
        />
      </div>
    </>
  )
}
