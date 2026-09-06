import styles from './SkillTag.module.css';

export type SkillTagProps = {
  color: string,
  value: string
}

export const SkillTag = ({color, value}: SkillTagProps) => {
  return (
    <span className={styles.tag} style={{backgroundColor: color}}>
      { value }
    </span>
  )
}
