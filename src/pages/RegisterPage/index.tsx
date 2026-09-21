import { useState } from 'react'
import { RegistrationStepOne } from '@/features/auth/ui/RegistrationStepOne'
import { RegistrationStepTwo } from '@/features/auth/ui/RegistrationStepTwo'

export default function RegisterPage() {
  const [step, setStep] = useState(1)

  if (step === 2) {
    return <RegistrationStepTwo />
  }

  return <RegistrationStepOne onNext={() => setStep(2)} />
}
