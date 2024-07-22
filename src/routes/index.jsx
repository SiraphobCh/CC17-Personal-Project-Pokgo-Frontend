import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../features/authentication/components/ProtectedRoute";
import PageContainer from "../pages/PageContainer";
import AuthContextProvider from "../contexts/AuthContext";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const MainContainer = lazy(() => import("../layouts/MainContainer"));
const DiscoverPage = lazy(() => import("../pages/DiscoverPage"));
const CreateEventPage = lazy(() => import("../pages/CreateEventPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <MainContainer />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <PageContainer />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/events",
            element: <CreateEventPage />,
          },
          {
            path: "/discover",
            element: <DiscoverPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
