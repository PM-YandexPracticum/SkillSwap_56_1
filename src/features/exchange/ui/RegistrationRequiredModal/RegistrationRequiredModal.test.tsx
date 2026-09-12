import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { RegistrationRequiredModal } from './RegistrationRequiredModal'

describe('RegistrationRequiredModal', () => {
  it('показывает заголовок, текст и кнопку регистрации', () => {
    render(<RegistrationRequiredModal onClose={vi.fn()} />)

    expect(screen.getByText('Нужна регистрация')).toBeInTheDocument()
    expect(
      screen.getByText('Чтобы предложить обмен, войдите в систему или зарегистрируйтесь'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument()
  })

  it('закрывается по клику на затемнённый фон', async () => {
    const onClose = vi.fn()
    const { container } = render(<RegistrationRequiredModal onClose={onClose} />)

    await userEvent.click(container.firstChild as Element)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('не закрывается по клику внутри карточки', async () => {
    const onClose = vi.fn()
    render(<RegistrationRequiredModal onClose={onClose} />)

    await userEvent.click(screen.getByText('Нужна регистрация'))

    expect(onClose).not.toHaveBeenCalled()
  })
})
