export interface SkillFormData {
  title: string
  description: string
  categoryId: string
  subcategoryId: string
  images: File[]
}

export interface SkillFormErrors {
  title?: string
  description?: string
  categoryId?: string
  subcategoryId?: string
  images?: string
}

export const INITIAL_FORM_DATA: SkillFormData = {
  title: '',
  description: '',
  categoryId: '',
  subcategoryId: '',
  images: [],
}