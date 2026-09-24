import { Button } from '@/shared/ui/button/Button';
import AppleLogo from '@/shared/assets/apple.svg';
import GoogleLogo from '@/shared/assets/google.svg';

export function SocialAuthButtons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Button variant='socialLogin'><img src={GoogleLogo} alt='Google Icon' />Продолжить с Google</Button>
      <Button variant='socialLogin'><img src={AppleLogo} alt='Apple Icon' />Продолжить с Apple</Button>
    </div>
  )
}