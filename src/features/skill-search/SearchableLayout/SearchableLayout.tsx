//рендерит хедеры + SkillSearch
import { useState } from 'react';
import { GuestHeader } from '../../../widgets/GuestHeader/GuestHeader';
import { AuthenticatedHeader } from '../../../widgets/AuthenticatedHeader/AuthenticatedHeader';
import { SkillSearch } from '@/features/skill-search';
import styles from './SearchableLayout.module.css';

interface SearchableLayoutProps {
  isAuth?: boolean;
  userName?: string;
  userAvatar?: string | null;
  notificationsCount?: number;
  likesCount?: number;
  onLikeToggle?: () => void;
}

export const SearchableLayout = ({
  isAuth = false,
 // userName = 'Ким',
 // userAvatar = null,
  notificationsCount = 0,
  likesCount = 5,
  onLikeToggle,
}: SearchableLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={styles.layout}>
      {isAuth ? (
        <AuthenticatedHeader
          likesCount={likesCount}
          onLikeToggle={onLikeToggle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notificationsCount={notificationsCount}
        />
      ) : (
        <GuestHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      )}

      <main className={styles.main}>
        <SkillSearch query={searchQuery} />
      </main>
    </div>
  );
};
