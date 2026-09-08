import styles from './SkillCard.module.css';
import { UserInfo } from '@/entities/user/ui/UserInfo/UserInfo';
import { SkillTag } from '@/shared/ui/SkillTag/SkillTag';
//import { LikeButton } from '@/features/favorites/ui/LikeButton/LikeButton';
import { Button, buttonStyles } from '@/shared/ui/button/Button';
import { mock } from './mock';
import { useState, useEffect, useRef } from 'react';

export { mock as testMock };

interface SkillCardProps {
  user: {
    avatarUrl: string | null,
    name: string,
    city: string,
    age: number,
    description?: string
  },
  teach: {
    teachValue: string,
    teachTagColor: string
  },
  learn: {
    learnValue: string[],
    learnTagColor: string
  },
  moreTagColor: string,
  withButton: boolean
}

export const SkillCard = (props: SkillCardProps) => {
  const learnBoxRef = useRef<HTMLDivElement>(null);
  const [visibleSkillsCount, setVisibleSkillsCount] = useState(props.learn.learnValue.length);

  useEffect(() => {
    // Измеренеие ширины плашки со скрытыми тэгами
    const moreTagWidth = () => {
      const moreTag = document.createElement('span');
      moreTag.style.display = 'inline-block'
      moreTag.style.margin = '0'
      moreTag.style.padding = '8px 12px'
      moreTag.style.borderRadius = '20px'
      moreTag.style.position = 'absolute'
      moreTag.style.visibility = 'hidden'
      moreTag.textContent = `+${props.learn.learnValue.length}`
      document.body.appendChild(moreTag)
      const tagWidth = moreTag.getBoundingClientRect().width
      moreTag.remove()
      return tagWidth
    }
    const learnBox = learnBoxRef.current;
    if (!learnBox) return;

    const skills = [...learnBox.querySelectorAll('span')];
    const learnBoxRightSpace = learnBox.getBoundingClientRect().right
    const moreWidth = moreTagWidth();

    let visibleCount = 0;
    for (const skill of skills) {

      if (skill.getBoundingClientRect().right <= learnBoxRightSpace - moreWidth) {
        visibleCount++;
      } else break;
    }
    setVisibleSkillsCount(visibleCount);
  }, [props.learn.learnValue])

  const moreSkills = props.learn.learnValue.length - visibleSkillsCount;

  return (
    <div className={styles.skillcard}>
      <div className={styles.like}></div>
      <UserInfo name={props.user.name} city={props.user.city} age={props.user.age} avatarUrl={props.user.avatarUrl} />
      <p>{props.user.description}</p>
      <div className={styles.skillbox}>
        <p>Может научить:</p>
        <div>
          <SkillTag color={props.teach.teachTagColor} value={props.teach.teachValue} />
        </div>
        <p>Хочет научиться:</p>
        <div ref={learnBoxRef} className={styles.learnbox}>
          {props.learn.learnValue.slice(0, visibleSkillsCount).map((item, i) => <SkillTag key={i} color={props.learn.learnTagColor} value={item} />)}
          {moreSkills > 0 && <SkillTag color={props.moreTagColor} value={`+${moreSkills}`} />}
        </div>
      </div>
      {props.withButton && <Button text='Подробнее' className={buttonStyles.primary} />}
    </div>
  )
};
