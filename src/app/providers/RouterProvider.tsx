import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '@/shared/lib/constants';
import { PrivateRoute } from './PrivateRouter';

const CatalogPage = lazy(() => import('@/pages/CatalogPage'));
const SkillPage = lazy(() => import('@/pages/SkillPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.CATALOG} element={<CatalogPage />} />

          {/* public - 4 guests */}
          <Route path={ROUTES.SKILL} element={<SkillPage />} />

          {/* protected pages only 4 authorized users */}
          <Route
            path={ROUTES.FAVORITES}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CREATE}
            element={
              <PrivateRoute>
                <CreateSkillPage />
              </PrivateRoute>
            }
          />

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
