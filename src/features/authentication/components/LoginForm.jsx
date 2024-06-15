import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import validateLogin from '../validators/validate-login';

const initialInput = {
  characterNameOrEmail: '',
  password: '',
};

const initialInputError = {
  characterNameOrEmail: '',
  password: '',
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const error = validateLogin(input);
    if (error) {
      return setInputError(error);
    }

    setInputError(initialInputError);

    try {
      await login(input);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const message =
          error.response.status === 400
            ? 'invalid character name or email'
            : 'internal server error';
        return toast.error(message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid gap-4">
        <div>
          <Input
            placeholder="Character name or Email"
            name="characterNameOrEmail"
            value={input.characterNameOrEmail}
            onChange={handleChangeInput}
            error={inputError.characterNameOrEmail}
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div>
          <Button>Log in</Button>
        </div>
      </div>
    </form>
  );
}
