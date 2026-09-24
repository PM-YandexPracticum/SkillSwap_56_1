import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '@/widgets/Footer/Footer'

import { SkillForm } from '@/features/skill-create/ui/SkillForm/SkillForm'
import { SkillPreview } from '@/features/skill-create/ui/SkillPreview/SkillPreview'
import { OfferCreatedModal } from '@/features/skill-create/ui/OfferCreatedModal'
import { addCreatedSkill } from '@/features/skill-create/model/createdSkillsStorage'
import { readImagesAsDataUrls } from '@/features/skill-create/model/readImagesAsDataUrls'
import type { SkillFormData } from '@/features/skill-create/model/types'
import { getAuthUser } from '@/features/auth/model/authUtils'
import {
  getCategoryById,
  getSubcategoryOptions,
  type CategoryId,
} from '@/entities/skill/model/categories'
import { ROUTES } from '@/shared/lib/constants'

import styles from './CreateSkillPage.module.css'

type ModalStep = 'none' | 'preview' | 'created'

function getAgeFromBirthDate(birthDate?: string): number {
  if (!birthDate) return 18
  const parsed = new Date(birthDate)
  if (Number.isNaN(parsed.getTime())) return 18
  const age = new Date().getFullYear() - parsed.getFullYear()
  return age > 0 ? age : 18
}

export default function CreateSkillPage() {
  const navigate = useNavigate()
  const authUser = useMemo(() => getAuthUser(), [])

  const [formData, setFormData] = useState<SkillFormData | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [modalStep, setModalStep] = useState<ModalStep>('none')

  const categoryLabel = formData?.categoryId
    ? (getCategoryById(formData.categoryId as CategoryId)?.name ?? '')
    : ''

  const subcategoryLabel =
    formData?.categoryId && formData?.subcategoryId
      ? (getSubcategoryOptions([formData.categoryId as CategoryId]).find(
          (o) => o.value === formData.subcategoryId,
        )?.label ?? '')
      : ''

  const handleFormSubmit = async (data: SkillFormData) => {
    setFormData(data)
    setImageUrls(await readImagesAsDataUrls(data.images))
    setModalStep('preview')
  }

  const handleEdit = () => setModalStep('none')

  const handleCreate = () => {
  if (!authUser || !formData) return

  addCreatedSkill({
    id: `skill_${authUser.id}_${Date.now()}`,
    user: {
      name: authUser.name,
      age: getAgeFromBirthDate(authUser.birthDate),
      city: authUser.city || 'Не указан',
      avatarUrl: null,
      description: authUser.about || '',
    },
    moreTagColor: 'purple',
    teach: { teachValue: formData.title.trim(), teachTagColor: 'green' },
    learn: { learnValue: [], learnTagColor: 'yellow' },
    likesCount: 0,
  })

  setModalStep('created')
}

  const handleCreatedModalClose = () => {
    setModalStep('none')
    navigate(ROUTES.CATALOG)
  }

  return (
    <div className={styles.page}>
      <AuthenticatedHeader />

    <main className={styles.content}>
      <div className={styles.form}>
        <SkillForm
          onSubmit={handleFormSubmit}
          submitText="Продолжить"
          onBack={() => navigate(-1)}
        />
      </div>
    </main>

      <Footer />

      {modalStep === 'preview' && formData && (
        <SkillPreview
          name={formData.title}
          caption={`${categoryLabel} / ${subcategoryLabel}`}
          text={formData.description}
          images={imageUrls}
          OverlayClick={handleEdit}
          onEdit={handleEdit}
          onDone={handleCreate}
        />
      )}

      {modalStep === 'created' && (
        <OfferCreatedModal onClose={handleCreatedModalClose} />
      )}
    </div>
  )
}