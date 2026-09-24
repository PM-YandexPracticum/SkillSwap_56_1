import { createPortal } from 'react-dom'
import { FocusTrap } from 'focus-trap-react'

import { Button } from '@/shared/ui/button/Button'
import edit from '@/shared/assets/edit.svg'

import styles from './SkillPreview.module.css'

import Img from '@/shared/ui/Skill/Image.png'
import Img2 from '@/shared/ui/Skill/Image (1).png'
import Img3 from '@/shared/ui/Skill/Image (2).png'
import Img4 from '@/shared/ui/Skill/+3.png'

import { SkillProps } from '@/shared/ui/Skill/Skill'

interface SkillPreviewProps extends SkillProps {
  OverlayClick: () => void
  /** Вернуться к форме редактирования без потери введённых данных */
  onEdit: () => void
  /** Подтвердить и создать навык */
  onDone: () => void
}

const defaultImages = [Img, Img2, Img3, Img4]

export const SkillPreview = (props: SkillPreviewProps) => {
  const editImg = <img src={edit} alt="Pencil" />

  const previewImages =
    props.images && props.images.length > 0 ? props.images : defaultImages
  const [mainImage, ...restImages] = previewImages
  const thumbnailImages = restImages.slice(0, 3)

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        returnFocusOnDeactivate: true,
        escapeDeactivates: false,
      }}
    >
      <div className={styles.overlay} onClick={props.OverlayClick} role="dialog" aria-modal="true">
        <div className={styles.skill} onClick={(e) => e.stopPropagation()}>
          <div className={styles.previewHeader}>
            <h2>Ваше предложение</h2>
            <span className={styles.caption}>
              Пожалуйста, проверьте и подтвердите правильность данных
            </span>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>
              <h1 className={styles.header}>{props.name}</h1>
              <span className={styles.caption}>{props.caption}</span>
              <p className={styles.text}>{props.text}</p>
              <div className={styles.buttons}>
                <Button
                  type="button"
                  variant="secondary"
                  style={{ width: '204px', display: 'flex', gap: '8px' }}
                  onClick={props.onEdit}
                >
                  Редактировать
                  {editImg}
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  style={{ width: '204px' }}
                  onClick={props.onDone}
                >
                  Готово
                </Button>
              </div>
            </div>
            <div className={styles.images}>
              <div className={styles.mainImage}>
                <img src={mainImage} alt={props.name} />
              </div>
              <div className={styles.captionImages}>
                {thumbnailImages.map((src, index) => (
                  <img key={index} src={src} alt={props.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  )
}
