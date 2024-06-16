import AuthContextProvider from './contexts/AuthContext';
import Router from './routes';
import { Slide, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import Spinner from './components/Spinner';

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <AuthContextProvider>
          <Router />
          <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} />
        </AuthContextProvider>
      </Suspense>
    </>
  );
}

export default App;
