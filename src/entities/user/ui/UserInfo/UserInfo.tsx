import styles from './UserInfo.module.css'
import defaultAvatar from '@/shared/assets/defaultAvatar.svg'

type UserInfoProps = {
  name: string
  age: number
  city: string
  avatarUrl: string | null
}

const getAgeWord = (age: number) => {
  const lastTwoDigits = age % 100
  const lastDigit = age % 10
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет'
  }
  if (lastDigit === 1) {
    return 'год'
  }
  if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
    return 'года'
  }
  return 'лет'
}

export const UserInfo = ({ avatarUrl, name, age, city }: UserInfoProps) => {
  return (
    <div className={styles.userInfo}>
      <img className={styles.avatar} src={avatarUrl ?? defaultAvatar} alt={name} />

      <div className={styles.userData}>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.meta}>
          {city}, {age} {getAgeWord(age)}
        </p>
      </div>
    </div>
  )
}
