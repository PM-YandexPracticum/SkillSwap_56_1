import { Button, buttonStyles } from '@/shared/ui/button/Button'
import AppleLogo from '@/shared/assets/apple.png';
import GoogleLogo from '@/shared/assets/google.png';

export function SocialAuthButtons () {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button className={buttonStyles.socialLogin} text='Продолжить с Google' icon={<img src={GoogleLogo} alt='Google Icon' />} />
      <Button className={buttonStyles.socialLogin} text='Продолжить с Apple' icon={<img src={AppleLogo} alt='Apple Icon' />} />
    </div>
  )
}