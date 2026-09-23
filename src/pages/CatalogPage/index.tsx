import { useEffect, useMemo, useState } from 'react'
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

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const [filters, setFilters] = useState<FilterState>(initialFilterState)

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

  return (
    <div className={styles.page}>
      {isAuthenticated() ? (
        <AuthenticatedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      ) : (
        <GuestHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}

      <main className={styles.main}>
        <FiltersSidebar filters={filters} setFilters={setFilters} />

        <section className={styles.content}>
          {searchQuery.trim() ? (
            <SkillSearch query={searchQuery} />
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
                      {catalogCards.map((card) => (
                        <SkillCard key={card.id} {...card} withButton={false} />
                      ))}
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
