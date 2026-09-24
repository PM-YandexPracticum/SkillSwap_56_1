import { useMemo, useState } from 'react'
import {
  CategoryId,
  SubcategoryId,
  getAllSubcategoryOptions,
  getCategoryBySubcategoryId,
  getSubcategoryOptions,
} from '@/entities/skill/model/categories'

export function useCategorySubcategorySelection() {
  // состояния
  const [categoryIds, setCategoryIds] = useState<CategoryId[]>([])
  const [subcategoryIds, setSubcategoryIds] = useState<SubcategoryId[]>([])
  // доступные подкатегории
  const subcategoryOptions = useMemo(
    () =>
      categoryIds.length === 0 ? getAllSubcategoryOptions() : getSubcategoryOptions(categoryIds),
    [categoryIds],
  )
  // изменение категорий
  const handleCategoriesChange = (value: CategoryId[]) => {
    setCategoryIds(value)

    const available = new Set(getSubcategoryOptions(value).map((option) => option.value))

    setSubcategoryIds((prev) => prev.filter((id) => available.has(id)))
  }
  // изменение подкатегорий
  const handleSubcategoriesChange = (value: SubcategoryId[]) => {
    setSubcategoryIds(value)

    const relatedCategoryIds = Array.from(
      new Set(
        value
          .map((id) => getCategoryBySubcategoryId(id)?.id)
          .filter((id): id is CategoryId => Boolean(id)),
      ),
    )

    setCategoryIds(relatedCategoryIds)
  }

  return {
    categoryIds,
    subcategoryIds,
    subcategoryOptions,
    handleCategoriesChange,
    handleSubcategoriesChange,
  }
}
