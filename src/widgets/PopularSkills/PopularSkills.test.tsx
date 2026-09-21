import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { PopularSkills } from './PopularSkills'
import { SkillCardProps } from '@/entities/skill/ui/SkillCard'

const makeSkill = (name: string, likesCount: number): SkillCardProps => ({
  id: name,
  user: {
    avatarUrl: null,
    name,
    city: 'Москва',
    age: 25,
    description: '',
  },
  teach: {
    teachValue: 'Навык',
    teachTagColor: 'red',
  },
  learn: {
    learnValue: ['Учиться'],
    learnTagColor: 'yellow',
  },
  moreTagColor: 'pink',
  withButton: true,
  likesCount,
  withLikeButton: true,
})

const getVisibleNames = () => screen.getAllByRole('heading', { level: 3 }).map((el) => el.textContent)

describe('PopularSkills', () => {
  it('сортирует карточки по количеству лайков и показывает 3 по умолчанию', () => {
    const skills = [
      makeSkill('Низкий рейтинг', 1),
      makeSkill('Самый популярный', 50),
      makeSkill('Средний рейтинг', 10),
      makeSkill('Ещё один', 5),
    ]

    render(<PopularSkills skills={skills} />)

    expect(getVisibleNames()).toEqual(['Самый популярный', 'Средний рейтинг', 'Ещё один'])
  })

  it('раскрывает до 9 карточек по клику на "Смотреть все" и сворачивает обратно', async () => {
    const skills = Array.from({ length: 9 }, (_, i) => makeSkill(`Навык ${i}`, i))

    render(<PopularSkills skills={skills} />)

    expect(getVisibleNames()).toHaveLength(3)

    const toggleButton = screen.getByRole('button', { name: /смотреть все/i })
    await userEvent.click(toggleButton)

    expect(getVisibleNames()).toHaveLength(9)
    expect(screen.getByRole('button', { name: /свернуть/i })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /свернуть/i }))

    expect(getVisibleNames()).toHaveLength(3)
  })

  it('не показывает кнопку "Смотреть все", если карточек меньше или равно 3', () => {
    const skills = [makeSkill('A', 1), makeSkill('B', 2)]

    render(<PopularSkills skills={skills} />)

    expect(screen.queryByRole('button', { name: /смотреть все/i })).not.toBeInTheDocument()
  })
})
