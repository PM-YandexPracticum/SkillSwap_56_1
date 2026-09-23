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
import {
  InfiniteScrollTrigger,
  usePaginatedSkills,
} from '@/features/skill-pagination'
import { SkillSearch } from '@/features/skill-search'
import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [users, setUsers] = useState<User[]>([])

  const {
    visibleSkills,
    hasMore,
    isLoading,
    loadMore,
  } = usePaginatedSkills()

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers()
      setUsers(data)
    }

    void loadUsers()
  }, [])

  const usersById = useMemo(
    () => new Map(users.map((user) => [user.id, user])),
    [users],
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
        <AuthenticatedHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      ) : (
        <GuestHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      <main className={styles.main}>
        <FiltersSidebar />

        <section className={styles.content}>
          {searchQuery.trim() ? (
            <SkillSearch query={searchQuery} />
          ) : (
            <>
              <div className={styles.section}>
                <div className={styles.cards}>
                  {catalogCards.map((card) => (
                    <SkillCard
                      key={card.id}
                      {...card}
                      withButton={true}
                    />
                  ))}
                </div>

                <InfiniteScrollTrigger
                  hasMore={hasMore}
                  isLoading={isLoading}
                  onLoadMore={loadMore}
                />
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}