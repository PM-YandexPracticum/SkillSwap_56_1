import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { ProposeExchangeButton } from './ProposeExchangeButton'
import { saveAuthUser, clearAuthUser } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

const SKILL_ID = 'skill-1'
const AUTHOR_ID = 'author-1'

function renderButton() {
  return render(
    <MemoryRouter>
      <ProposeExchangeButton skillId={SKILL_ID} toUserId={AUTHOR_ID} />
    </MemoryRouter>,
  )
}

afterEach(() => {
  clearAuthUser()
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REQUESTS)
})

describe('ProposeExchangeButton', () => {
  it('гостю показывает RegistrationRequiredModal вместо отправки обмена', async () => {
    renderButton()

    await userEvent.click(screen.getByRole('button', { name: 'Предложить обмен' }))

    expect(screen.getByText('Нужна регистрация')).toBeInTheDocument()
    expect(localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)).toBeNull()
  })

  it('переход по «Зарегистрироваться» ведёт на страницу регистрации', async () => {
    renderButton()

    await userEvent.click(screen.getByRole('button', { name: 'Предложить обмен' }))
    await userEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

    expect(screen.queryByText('Нужна регистрация')).not.toBeInTheDocument()
  })

  it('если обмен уже предложен ранее, сразу показывает недоступную кнопку «Обмен предложен»', () => {
    saveAuthUser({ id: 'user-1', name: 'Мария', email: 'maria@test.ru' })
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.REQUESTS,
      JSON.stringify([
        {
          id: 'existing',
          skillId: SKILL_ID,
          fromUserId: 'user-1',
          toUserId: AUTHOR_ID,
          status: 'pending',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ]),
    )

    renderButton()

    expect(screen.getByRole('button', { name: 'Обмен предложен' })).toBeDisabled()
    expect(screen.queryByRole('button', { name: 'Предложить обмен' })).not.toBeInTheDocument()
  })
})
