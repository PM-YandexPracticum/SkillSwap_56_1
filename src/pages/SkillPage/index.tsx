import { SkillCard } from '@/entities/skill/ui/SkillCard'
import { FavoriteSkillCard } from '@/features/favorites/ui/FavoriteSkillCard'
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '@/widgets/Footer/Footer'
import { Skill } from '@/shared/ui/Skill/Skill'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader'
import { ProposeExchangeButton } from '@/features/exchange/ui/ProposeExchangeButton'
import styles from './SkillPage.module.css'
import { useParams } from 'react-router-dom'
import { fetchSkillById, fetchSkills } from '@/api/skills'
import { useEffect, useState } from 'react'
import type { Skill as SkillEntity, User } from '@/shared/types'
import { fetchUserById } from '@/api/users'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'
import NotFoundPage from '@/pages/NotFoundPage'
import { useNavigate } from 'react-router-dom'

export default function SkillPage() {
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const [skill, setSkill] = useState<SkillEntity>()
  const [user, setUser] = useState<User>()
  const [similarSkills, setSimilarSkills] = useState<SkillEntity[]>([])
  const [similarUsers, setSimilarUsers] = useState<Record<string, User>>({})
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return

    fetchSkillById(id).then(async (skill) => {
      if (!skill) {
        setNotFound(true)
        return
      }

      setSkill(skill)

      const user = await fetchUserById(skill.authorId)
      setUser(user)

      const skills = await fetchSkills()

      const similar = skills
        .filter(
          (item) =>
            item.category === skill.category && item.id !== skill.id,
        )
        .slice(0, 4)

      setSimilarSkills(similar)

      const users = await Promise.all(
        similar.map(async (similarSkill) => {
          const user = await fetchUserById(similarSkill.authorId)

          return {
            authorId: similarSkill.authorId,
            user,
          }
        }),
      )

      const usersMap: Record<string, User> = {}

      users.forEach(({ authorId, user }) => {
        if (user) {
          usersMap[authorId] = user
        }
      })

      setSimilarUsers(usersMap)
    })
  }, [id])

  if (notFound) {
    return <NotFoundPage />
  }

  return (
    <main className={styles.page}>
      <AuthenticatedHeader />

      <div className={styles.content}>
        <div className={styles.skill}>
          {skill && user && (
            <SkillCard
              {...toSkillCardProps(skill, user)}
              withButton={false}
              withDescription={true}
              withLikeButton={false}
            />
          )}

          {skill && user && (
            <Skill
              name={skill.title}
              caption={`${skill.category} / ${skill.subcategory}`}
              text={skill.description}
              actionSlot={
                <ProposeExchangeButton
                  skillId={skill.id}
                  toUserId={skill.authorId}
                />
              }
            />
          )}
        </div>

        <div className={styles.similar}>
          <SectionHeader
            title="Похожие предложения"
            showButton={false}
          />

          <div className={styles.skillCards}>
            {similarSkills.map((similarSkill) => {
              const similarUser =
                similarUsers[similarSkill.authorId]

              if (!similarUser) return null

              return (
                <FavoriteSkillCard
                  key={similarSkill.id}
                  {...toSkillCardProps(
                    similarSkill,
                    similarUser,
                  )}
                  withButton={true}
                  withDescription={false}
                  withLikeButton={true}
                  onNavigate={(id) => navigate(`/skill/${id}`)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}