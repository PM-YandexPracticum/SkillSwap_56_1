import { LikeButton } from '@/shared/ui/LikeButton/LikeButton';
import styles from './Skill.module.css';
import More from '@/shared/assets/more-square.svg';
import Share from '@/shared/assets/share.svg';
import Img from './Image.png';
import Img2 from './Image (1).png';
import Img3 from './Image (2).png';
import Img4 from './+3.png';
import type { ReactNode } from 'react';

export interface SkillProps {
    name: string,
    caption: string,
    text: string,
    images?: string[],
    /** Слот для действия над навыком (например, кнопка «Предложить обмен» из фичи exchange) */
    actionSlot?: ReactNode
}

export const Skill = (props: SkillProps) => {
  return (
    <div className={styles.skill}>
      <div className={styles.headerButtons}>
        <LikeButton liked={false} />
        <button className={styles.imageButton}><img src={Share} alt="Кнопка поделиться" /></button>
        <button className={styles.imageButton}><img src={More} alt="Дополнительное меню" /></button>
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h1 className={styles.header}>{props.name}</h1>
          <span className={styles.caption}>{props.caption}</span>
          <p className={styles.text}>{props.text}</p>
          {props.actionSlot && <div className={styles.actionSlot}>{props.actionSlot}</div>}
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
  )
}