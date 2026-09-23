import { useCallback, useMemo, useState } from 'react'
import {
  INITIAL_FORM_DATA,
  type SkillFormData,
  type SkillFormErrors,
} from './types'
import { validateForm, MAX_IMAGES } from './validation'
import {
  getSubcategoryOptions,
  type CategoryId,
} from '@/entities/skill/model/categories'

export const useSkillForm = () => {
  const [data, setData] = useState<SkillFormData>(INITIAL_FORM_DATA)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const errors = useMemo<SkillFormErrors>(() => validateForm(data), [data])

  const visibleErrors = useMemo<SkillFormErrors>(() => {
    const result: SkillFormErrors = {}
    for (const key of Object.keys(errors) as (keyof SkillFormErrors)[]) {
      if (touched[key] && errors[key]) result[key] = errors[key]
    }
    return result
  }, [errors, touched])

  const isValid = Object.keys(errors).length === 0

  const updateField = useCallback(
    <K extends keyof SkillFormData>(field: K, value: SkillFormData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }))
      setTouched((prev) => ({ ...prev, [field]: true }))
    },
    [],
  )

  const setCategory = useCallback((categoryId: string) => {
    setData((prev) => ({ ...prev, categoryId, subcategoryId: '' }))
    setTouched((prev) => ({
      ...prev,
      categoryId: true,
      subcategoryId: false,
    }))
  }, [])

  const setSubcategory = useCallback(
    (subcategoryId: string) => updateField('subcategoryId', subcategoryId),
    [updateField],
  )

  const addImages = useCallback((files: File[]) => {
    setData((prev) => ({
      ...prev,
      images: [...prev.images, ...files].slice(0, MAX_IMAGES),
    }))
    setTouched((prev) => ({ ...prev, images: true }))
  }, [])

  const removeImage = useCallback((index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }, [])

  const subcategoryOptions = useMemo(() => {
    if (!data.categoryId) return []
    return getSubcategoryOptions([data.categoryId as CategoryId])
  }, [data.categoryId])

  return {
    data,
    errors: visibleErrors,
    isValid,
    updateField,
    setCategory,
    setSubcategory,
    addImages,
    removeImage,
    subcategoryOptions,
  }
}