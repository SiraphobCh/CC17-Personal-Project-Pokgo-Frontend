import Modal from '../components/Modal';
import LoginForm from '../features/authentication/components/LoginForm';
import RegisterContainer from '../features/authentication/components/RegisterContainer';

export default function LoginPage() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-sm mx-auto shadow-lg mt-60">
      <LoginForm />
      <hr className="my-4" />
      <RegisterContainer />
      <Modal title="Sign Up"></Modal>
    </div>
  );
}
