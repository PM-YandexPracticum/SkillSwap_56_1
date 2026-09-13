import { Button, buttonStyles } from '@/shared/ui/button/Button'
import AppleLogo from '@/shared/assets/apple.svg'
import GoogleLogo from '@/shared/assets/google.svg'

export function SocialAuthButtons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button
        type="button"
        className={buttonStyles.socialLogin}
        text="Продолжить с Google"
        icon={<img src={GoogleLogo} alt="" width={24} height={24} />}
      />
      <Button
        type="button"
        className={buttonStyles.socialLogin}
        text="Продолжить с Apple"
        icon={<img src={AppleLogo} alt="" width={21} height={24} />}
      />
    </div>
  )
}