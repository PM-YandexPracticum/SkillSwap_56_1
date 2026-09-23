import { useState } from 'react'
import { isAuthenticated } from '@/shared/lib/auth'
import { GuestHeader } from '@/widgets/GuestHeader/GuestHeader'
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'

import { PopularSkills } from '@/widgets/PopularSkills/PopularSkills'
import { NewSkills } from '@/widgets/NewSkills/NewSkills'
import { RecommendedSkills } from '@/widgets/RecommendedSkills/RecommendedSkills'
import { Footer } from '@/widgets/Footer/Footer'
import { SKILLS_DATA } from '@/features/skill-search/data/skills'
import { SkillSearch } from '@/features/skill-search'

import styles from './CatalogPage.module.css'

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const catalogSkills = SKILLS_DATA.map((skill) => ({
    ...skill,
    withButton: false,
  }))

  return (
    <div className={styles.page}>
      {isAuthenticated() ? (
        <AuthenticatedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      ) : (
        <GuestHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}

      <main className={styles.main}>
        {/* <FiltersSidebar /> */}

        <section className={styles.content}>
          {searchQuery.trim() ? (
            <SkillSearch query={searchQuery} />
          ) : (
            <>
              <div className={styles.section}>
                <PopularSkills skills={catalogSkills} />
              </div>

              <div className={styles.section}>
                <NewSkills skills={catalogSkills} />
              </div>

              <div className={styles.section}>
                <RecommendedSkills recommendedUsers={catalogSkills} />
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
