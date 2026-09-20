import { SearchableLayout } from '@/features/skill-search'
import { Footer } from '@/widgets/Footer/Footer'
import FiltersSidebar from '@/widgets/FiltersSidebar/FiltersSidebar'

export default function CatalogPage() {
  return (
    <>
      <SearchableLayout sidebar={<FiltersSidebar />} />
      <Footer />
    </>
  )
}
