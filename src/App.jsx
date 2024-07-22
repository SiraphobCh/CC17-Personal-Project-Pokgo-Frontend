import Router from "./routes";
import { Slide, ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Spinner from "./components/Spinner";

function App() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router />
        <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} />
      </Suspense>
    </>
  );
}

export default App;
