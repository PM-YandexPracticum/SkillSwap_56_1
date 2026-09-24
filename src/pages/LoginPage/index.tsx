import { useNavigate, useSearchParams } from 'react-router-dom'
import { RegistrationStepOne } from '@/features/auth/ui/RegistrationStepOne'
import { saveAuthUser } from '@/features/auth/model/authUtils'
import { ROUTES } from '@/shared/lib/constants'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const returnUrl = searchParams.get('returnUrl') || ROUTES.HOME

  const handleLogin = (email: string) => {
    // Создаём mock-пользователя
    const mockUser = {
      id: crypto.randomUUID(),
      name: email.split('@')[0] || 'Пользователь',
      email,
    }

    // Сохраняем в localStorage через authUtils
    saveAuthUser(mockUser)

    // Возвращаем на URL, с которого пришёл (или на главную)
    navigate(returnUrl, { replace: true })
  }

  return <RegistrationStepOne mode="login" onLogin={handleLogin} />
}
