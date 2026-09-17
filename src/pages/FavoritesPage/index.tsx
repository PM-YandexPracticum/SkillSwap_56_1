
import { useState } from 'react';
import { ExchangeCreatedModal } from '@/features/exchange-create/ui/ExchangeCreatedModal';
import { OfferCreatedModal } from '@/features/skill-create/ui/OfferCreatedModal';

export default function FavoritesPage() {
  const [modal, setModal] = useState<'exchange' | 'offer' | null>(null);

  return (
    <main style={{ padding: '40px' }}>
      <h1>FavoritesPage</h1>
      <p>Оставил эту страницу для тестирования модалок Олей</p>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          background: '#f5f5f5',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setModal('exchange')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#ABD27A',
            color: '#253017',
            fontWeight: 500,
          }}
        >
          Открыть модалочку «Вы предложили обмен»
        </button>

        <button
          onClick={() => setModal('offer')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#ABD27A',
            color: '#253017',
            fontWeight: 500,
          }}
        >
          Открыть модалочку «Ваше предложение создано»
        </button>
      </div>

      {modal === 'exchange' && (
        <ExchangeCreatedModal onClose={() => setModal(null)} />
      )}

      {modal === 'offer' && (
        <OfferCreatedModal onClose={() => setModal(null)} />
      )}
    </main>
  );
}














// TODO: реализовать страницу FavoritesPage

/*export default function FavoritesPage() {
  return (
    <main>
      <h1>FavoritesPage</h1>
      <p>Страница в разработке</p>
    </main>
  )
}
*/
