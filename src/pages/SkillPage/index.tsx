import { SkillCard, testMock } from '@/entities/skill/ui/SkillCard';
import { AuthenticatedHeader } from '@/widgets/AuthenticatedHeader/AuthenticatedHeader';
import { Footer } from '@/widgets/Footer/Footer';
import { Skill } from '@/shared/ui/Skill/Skill'
import { SectionHeader } from '@/shared/ui/SectionHeader/SectionHeader';
import styles from './SkillPage.module.css';



export default function SkillPage() {
  return (
    <main className={styles.page}>
      <AuthenticatedHeader />
      <div className={styles.content}>
        <div className={styles.skill}>
          <SkillCard user={testMock.user} teach={testMock.teach} learn={testMock.learn} moreTagColor={testMock.moreTagColor} withButton={false} withDescription={true} withLikeButton={false} isLiked={false} />
          <Skill name='Игра на барабанах' caption='Творчество и искусство / Музыка и звук' text='Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры' />
        </div>
        <div className={styles.similar}>
          <SectionHeader title='Похожие предложения' showButton={false} />
          <div className={styles.skillCards}>
            <SkillCard user={testMock.user} teach={testMock.teach} learn={testMock.learn} moreTagColor={testMock.moreTagColor} withButton={true} withDescription={false} withLikeButton={true} isLiked={false} />
            <SkillCard user={testMock.user} teach={testMock.teach} learn={testMock.learn} moreTagColor={testMock.moreTagColor} withButton={true} withDescription={false} withLikeButton={true} isLiked={false} />
            <SkillCard user={testMock.user} teach={testMock.teach} learn={testMock.learn} moreTagColor={testMock.moreTagColor} withButton={true} withDescription={false} withLikeButton={true} isLiked={false} />
            <SkillCard user={testMock.user} teach={testMock.teach} learn={testMock.learn} moreTagColor={testMock.moreTagColor} withButton={true} withDescription={false} withLikeButton={true} isLiked={false} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
