import { createPortal } from 'react-dom'
import { FocusTrap } from 'focus-trap-react'

import { Button, buttonStyles } from '@/shared/ui/button/Button'
import edit from '@/shared/assets/edit.svg'

import styles from './SkillPreview.module.css'

import Img from '@/shared/ui/Skill/Image.png'
import Img2 from '@/shared/ui/Skill/Image (1).png'
import Img3 from '@/shared/ui/Skill/Image (2).png'
import Img4 from '@/shared/ui/Skill/+3.png'

import { SkillProps } from '@/shared/ui/Skill/Skill'

interface SkillPreviewProps extends SkillProps {
  OverlayClick: () => void
}

export const SkillPreview = (props: SkillPreviewProps) => {
  const editImg = <img src={edit} alt="Pencil" />

  return createPortal(
    <FocusTrap
      focusTrapOptions={{
        returnFocusOnDeactivate: true,
        escapeDeactivates: false,
      }}
    >
      <div className={styles.overlay} onClick={props.OverlayClick} role="dialog" aria-modal="true">
        <div className={styles.skill}>
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
                  icon={<>Редактировать {editImg}</>}
                  className={buttonStyles.secondary}
                  style={{ width: '204px', display: 'flex', gap: '8px' }}
                />
                <Button text="Готово" className={buttonStyles.primary} style={{ width: '204px' }} />
              </div>
            </div>
            <div className={styles.images}>
              <div className={styles.mainImage}>
                <img src={Img} alt="Играет на барабане" />
              </div>
              <div className={styles.captionImages}>
                <img src={Img2} alt="Играет на барабане" />
                <img src={Img3} alt="Играет на барабане" />
                <img src={Img4} alt="Играет на барабане" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>,
    document.body,
  )
}
