import type { SkillFormData, SkillFormErrors } from './types'

export const TITLE_MIN = 3
export const TITLE_MAX = 50
export const DESCRIPTION_MAX = 500
export const MAX_IMAGES = 4
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']

export const validateTitle = (title: string): string | undefined => {
  const trimmed = title.trim()
  if (!trimmed) return 'Укажите название навыка'
  if (trimmed.length < TITLE_MIN) return `Минимум ${TITLE_MIN} символа`
  if (trimmed.length > TITLE_MAX) return `Максимум ${TITLE_MAX} символов`
  return undefined
}

export const validateDescription = (description: string): string | undefined => {
  if (!description.trim()) return 'Добавьте описание'
  if (description.length > DESCRIPTION_MAX) {
    return `Максимум ${DESCRIPTION_MAX} символов`
  }
  return undefined
}

export const validateImages = (files: File[]): string | undefined => {
  if (files.length > MAX_IMAGES) return `Максимум ${MAX_IMAGES} изображения`
  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return 'Только JPEG или PNG'
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return 'Размер каждого файла — не более 2 МБ'
    }
  }
  return undefined
}

export const validateForm = (data: SkillFormData): SkillFormErrors => {
  const errors: SkillFormErrors = {}

  const titleError = validateTitle(data.title)
  if (titleError) errors.title = titleError

  const descriptionError = validateDescription(data.description)
  if (descriptionError) errors.description = descriptionError

  if (!data.categoryId) errors.categoryId = 'Выберите категорию'
  if (!data.subcategoryId) errors.subcategoryId = 'Выберите подкатегорию'

  const imagesError = validateImages(data.images)
  if (imagesError) errors.images = imagesError

  return errors
}