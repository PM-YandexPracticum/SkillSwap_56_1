import { ROUTES } from '@/shared/lib/constants'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { useNavigate } from 'react-router-dom'

const errorImage = '/assets/icons/page-error-404.svg'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const handleClickToHome = () => {
    navigate(ROUTES.HOME)
  }
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="flex flex-col max-w-md w-full gap-8">
        <div className="flex flex-col items-center">
          <img src={errorImage} alt="страница не найдена" className="mb-10" />
          <h1 className="text-2xl">Страница не найдена</h1>
          <p className="text-center leading-6">
            К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <Button
            className="flex-1 text-base font-normal py-6"
            variant={'outline'}
            onClick={() => {}}
          >
            Сообщить об ошибке
          </Button>
          <Button className="flex-1 text-base font-normal py-6" onClick={handleClickToHome}>
            На главную
          </Button>
        </div>
      </div>
    </main>
  )
}