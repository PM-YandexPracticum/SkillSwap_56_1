import { type ChangeEvent, type FormEvent } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { Textarea } from '@/shared/ui/Textarea/Textarea'
import { Select } from '@/shared/ui/Select'
import { Button } from '@/shared/ui/button/Button'
import { categoryOptions } from '@/entities/skill/model/categories'
import type { SkillFormData } from '../../model/types'
import { MAX_IMAGES } from '../../model/validation'
import { useSkillForm } from '../../model/useSkillForm'
import styles from './SkillForm.module.css'

interface SkillFormProps {
  onSubmit?: (data: SkillFormData) => void
  submitText?: string
  onBack?: () => void
}

export const SkillForm = ({
  onSubmit,
  submitText = 'Продолжить',
  onBack,
}: SkillFormProps) => {
  const {
    data,
    errors,
    isValid,
    updateField,
    setCategory,
    setSubcategory,
    addImages,
    removeImage,
    subcategoryOptions,
  } = useSkillForm()

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    e.target.value = ''
    if (!files) return
    addImages(Array.from(files))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="skill-title">
          Название навыка
        </label>
        <Input
          id="skill-title"
          type="text"
          placeholder="Введите название вашего навыка"
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <Select
        label="Категория навыка"
        placeholder="Выберите категорию навыка"
        options={categoryOptions}
        value={data.categoryId || null}
        onChange={(v) => setCategory(v ?? '')}
      />
      {errors.categoryId && (
        <span className={styles.error}>{errors.categoryId}</span>
      )}

      <Select
        label="Подкатегория навыка"
        placeholder={
          data.categoryId
            ? 'Выберите подкатегорию навыка'
            : 'Сначала выберите категорию'
        }
        options={subcategoryOptions}
        value={data.subcategoryId || null}
        onChange={(v) => setSubcategory(v ?? '')}
        disabled={!data.categoryId}
      />
      {errors.subcategoryId && (
        <span className={styles.error}>{errors.subcategoryId}</span>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="skill-description">
          Описание
        </label>
        <Textarea
          id="skill-description"
          placeholder="Коротко опишите, чему можете научить"
          rows={3}
          value={data.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
        {errors.description && (
          <span className={styles.error}>{errors.description}</span>
        )}
      </div>

      <div className={styles.photoUpload}>
        <p className={styles.photoText}>
          {data.images.length > 0
            ? `Выбрано изображений: ${data.images.length} из ${MAX_IMAGES}`
            : 'Перетащите или выберите изображения навыка'}
        </p>
        <label className={styles.imgButton}>
          <input
            type="file"
            accept="image/jpeg,image/png"
            multiple
            hidden
            onChange={handleImagesChange}
          />
          Выбрать изображения
        </label>

        {data.images.length > 0 && (
          <ul className={styles.imagesList}>
            {data.images.map((file, i) => (
              <li key={`${file.name}-${i}`} className={styles.imageItem}>
                <span>{file.name}</span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeImage(i)}
                  aria-label={`Удалить ${file.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        {errors.images && (
          <span className={styles.error}>{errors.images}</span>
        )}
      </div>

      <div className={styles.buttons}>
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
        >
          Назад
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
        >
          {submitText}
        </Button>
      </div>
    </form>
  )
}