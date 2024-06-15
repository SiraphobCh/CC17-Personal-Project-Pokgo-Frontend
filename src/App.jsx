import AuthContextProvider from './contexts/AuthContext';
import Router from './routes';
import { Slide, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <Suspense fallback={<h1>Loading....</h1>}>
        <AuthContextProvider>
          <Router />
          <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} />
        </AuthContextProvider>
      </Suspense>
    </>
  );
}

export default App;
