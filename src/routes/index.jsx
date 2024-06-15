import { lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const MainContainer = lazy(() => import('../layouts/MainContainer'));

const router = createBrowserRouter([
  { path: '/', element: <MainContainer />, children: [{ path: '/', element: <HomePage /> }] },
  { path: '/login', element: <LoginPage /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
