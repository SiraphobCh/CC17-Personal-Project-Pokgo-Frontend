import useAuth from '../../../hooks/useAuth';
import Spinner from '../../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser && !isAuthUserLoading) {
      return navigate('/login');
    }
  }, []);

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
