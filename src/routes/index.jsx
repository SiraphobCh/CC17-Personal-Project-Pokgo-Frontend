import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../features/authentication/components/ProtectedRoute';
import RedirectIfLogged from '../features/authentication/components/RedirectIfLogged';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainContainer = lazy(() => import('../layouts/MainContainer'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainContainer />
      </ProtectedRoute>
    ),
    children: [{ path: '/', element: <HomePage /> }],
  },
  {
    path: '/login',
    element: (
      <RedirectIfLogged>
        <LoginPage />
      </RedirectIfLogged>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
