import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import type { User } from '@/shared/types'
import { isAuthenticated } from '@/shared/lib/auth'
import { fetchUsers } from '@/api/users'
import { GuestHeader } from '@/widgets/GuestHeader/GuestHeader'
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'
import FiltersSidebar from '@/widgets/FiltersSidebar/FiltersSidebar'
import { Footer } from '@/widgets/Footer/Footer'
import { SkillCard } from '@/entities/skill/ui/SkillCard'
import { toSkillCardProps } from '@/entities/skill/model/toSkillCardProps'
import { InfiniteScrollTrigger, usePaginatedSkills } from '@/features/skill-pagination'
import { SkillSearch } from '@/features/skill-search'

import { FilterState, initialFilterState, useFilteredUsers } from '@/features/skill-filter'

import styles from './CatalogPage.module.css'
import { useActiveChips } from '@/features/skill-filter/useActiveChips'
import { FilterChip } from '@/shared/ui/FilterChip/FilterChip'
import { useLikes } from '@/features/likes'
import { ROUTES } from '@/shared/lib/constants'

export default function CatalogPage() {
  const navigate = useNavigate()
  const auth = isAuthenticated()

  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const [filters, setFilters] = useState<FilterState>(initialFilterState)

  const { isLiked, toggleLike } = useLikes()

  const { visibleSkills, hasMore, isLoading, loadMore } = usePaginatedSkills()

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers()
      setUsers(data)
    }

    void loadUsers()
  }, [])

  const filteredUsers = useFilteredUsers(users, filters)
  const activeChips = useActiveChips(filters, setFilters)

  //  мap только из отфильтрованных пользователей
  const usersById = useMemo(
    () => new Map(filteredUsers.map((user) => [user.id, user])),
    [filteredUsers],
  )

  const catalogCards = useMemo(
    () =>
      visibleSkills.flatMap((skill) => {
        const user = usersById.get(skill.authorId)

        if (!user) {
          return []
        }

        return [toSkillCardProps(skill, user)]
      }),
    [visibleSkills, usersById],
  )

  //Гость - редирект на логин. Авторизованный - переключаем лайк.
  const handleLikeToggle = (skillId: string) => {
    if (!auth) {
      navigate(ROUTES.LOGIN)
      return
    }
    toggleLike(skillId)
  }

  return (
    <div className={styles.page}>
      {auth ? (
        <AuthenticatedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      ) : (
        <GuestHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}

      <main className={styles.main}>
        <FiltersSidebar filters={filters} setFilters={setFilters} />

        <section className={styles.content}>
          {searchQuery.trim() ? (
            <SkillSearch query={searchQuery} cards={catalogCards} />
          ) : (
            <>
              {/*  отрисовка активных чипсов над каталогом */}
              {activeChips.length > 0 && (
                <div className={styles.chipsList}>
                  {activeChips.map((chip) => (
                    <FilterChip key={chip.id} label={chip.label} onRemove={chip.onRemove} />
                  ))}
                </div>
              )}

              {catalogCards.length === 0 && !isLoading && !hasMore ? (
                <div className={styles.emptyState}>
                  <p>Ничего не найдено по выбранным фильтрам</p>
                </div>
              ) : (
                <div className={styles.section}>
                  {catalogCards.length > 0 && (
                    <div className={styles.cards}>
                      {catalogCards.map((card) => {
                        const liked = isLiked(card.id)
                        const likesCount = (card.likesCount ?? 0) + (liked ? 1 : 0)

                        return (
                          <SkillCard
                            key={card.id}
                            {...card}
                            likesCount={likesCount}
                            isLiked={liked}
                            onLikeToggle={() => handleLikeToggle(card.id)}
                            withButton
                            onNavigate={(id) => navigate(`/skill/${id}`)}
                            withLikeButton
                          />
                        )
                      })}
                    </div>
                  )}

                  <InfiniteScrollTrigger
                    hasMore={hasMore}
                    isLoading={isLoading}
                    onLoadMore={loadMore}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
