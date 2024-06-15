import { useState } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import validateRegister from '../validators/validate-register';
import authApi from '../../../apis/auth';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const initialInput = {
  characterName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialInputError = {
  characterName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }

      setInputError({ ...initialInput });

      await authApi.register(input);
      onSuccess();
      toast.success('register success');
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        if (error.response.data.field === 'characterName') {
          setInputError((prev) => ({
            ...prev,
            characterName: error.response.data.message,
          }));
        }
      }
      if (error instanceof AxiosError) {
        if (error.response.data.field === 'email') {
          setInputError((prev) => ({
            ...prev,
            email: error.response.data.message,
          }));
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4">
        <div>
          <Input
            placeholder="Character Name"
            value={input.characterName}
            name="characterName"
            onChange={handleChangeInput}
            error={inputError.characterName}
          />
        </div>
        <div>
          <Input
            placeholder="Email"
            type="text"
            value={input.email}
            name="email"
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            value={input.password}
            name="password"
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div>
          <Input
            placeholder="Confirm Password"
            type="password"
            value={input.confirmPassword}
            name="confirmPassword"
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div className="text-center">
          <Button> Sign Up </Button>
        </div>
      </div>
    </form>
  );
}
