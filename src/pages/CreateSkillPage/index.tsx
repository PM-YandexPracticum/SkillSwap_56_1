import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader'
import { Footer } from '@/widgets/Footer/Footer'
import { Input } from '@/shared/ui/Input/Input'
import { Select } from '@/shared/ui/Select'
import { Textarea } from '@/shared/ui/Textarea'
import { Button, buttonStyles } from '@/shared/ui/button/Button'
import { ROUTES } from '@/shared/lib/constants'

import { SkillPreview } from '@/features/skill-create/ui/SkillPreview/SkillPreview'
import { OfferCreatedModal } from '@/features/skill-create/ui/OfferCreatedModal'
import { addCreatedSkill } from '@/features/skill-create/model/createdSkillsStorage'
import { readImagesAsDataUrls } from '@/features/skill-create/model/readImagesAsDataUrls'
import { getAuthUser } from '@/features/auth/model/authUtils'
import {
  categoryOptions,
  getCategoryById,
  getSubcategoryOptions,
  type CategoryId,
  type SubcategoryId,
} from '@/entities/skill/model/categories'

import styles from './CreateSkillPage.module.css'

type ModalStep = 'none' | 'preview' | 'created'

const MAX_IMAGES = 4

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

  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null)
  const [subcategoryId, setSubcategoryId] = useState<SubcategoryId | null>(null)
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [modalStep, setModalStep] = useState<ModalStep>('none')

  const subcategoryOptions = useMemo(
    () => (categoryId ? getSubcategoryOptions([categoryId]) : []),
    [categoryId],
  )

  const categoryLabel = categoryId ? (getCategoryById(categoryId)?.name ?? '') : ''
  const subcategoryLabel =
    subcategoryOptions.find((option) => option.value === subcategoryId)?.label ?? ''

  const isFormValid = Boolean(
    title.trim() && categoryId && subcategoryId && description.trim(),
  )

  const handleCategoryChange = (value: CategoryId | null) => {
    setCategoryId(value)
    setSubcategoryId(null)
  }

  const handleImagesChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    event.target.value = ''
    if (!files || files.length === 0) return

    const dataUrls = await readImagesAsDataUrls(files)
    setImages((prev) => [...prev, ...dataUrls].slice(0, MAX_IMAGES))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isFormValid) return
    setModalStep('preview')
  }

  const handleEdit = () => setModalStep('none')

  const handleCreate = () => {
    if (!authUser) return

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
      teach: { teachValue: title.trim(), teachTagColor: 'green' },
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.title}>Укажите, чем вы готовы поделиться</h1>

          <div>
            <label>Название навыка</label>
            <Input
              type="text"
              placeholder="Введите название вашего навыка"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <Select
            label="Категория навыка"
            placeholder="Выберите категорию навыка"
            options={categoryOptions}
            value={categoryId}
            onChange={handleCategoryChange}
          />

          <Select
            label="Подкатегория навыка"
            placeholder="Выберите подкатегорию навыка"
            options={subcategoryOptions}
            value={subcategoryId}
            onChange={setSubcategoryId}
            disabled={!categoryId}
          />

          <div>
            <label>Описание</label>
            <Textarea
              placeholder="Коротко опишите, чему можете научить"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className={styles.photoUpload}>
            <p className={styles.photoText}>
              {images.length > 0
                ? `Выбрано изображений: ${images.length}`
                : 'Перетащите или выберите изображения навыка'}
            </p>
            <label className={styles.imgButton}>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImagesChange}
              />
              Выбрать изображения
            </label>
          </div>

          <Button
            type="submit"
            text="Продолжить"
            className={buttonStyles.primary}
            disabled={!isFormValid}
          />
        </form>
      </main>

      <Footer />

      {modalStep === 'preview' && (
        <SkillPreview
          name={title}
          caption={`${categoryLabel} / ${subcategoryLabel}`}
          text={description}
          images={images}
          OverlayClick={handleEdit}
          onEdit={handleEdit}
          onDone={handleCreate}
        />
      )}

      {modalStep === 'created' && <OfferCreatedModal onClose={handleCreatedModalClose} />}
    </div>
  )
}
