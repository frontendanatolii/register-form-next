'use client';
import Input from "@/components/Input"
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    userName: '',
    password: '',
    email: '',
  });

  useEffect(() => {
    const userDataIsValid = user.email.trim().length !== 0 && user.email.includes('@') && user.password.trim().length >= 8;

    if (userDataIsValid) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => setUser(prevState => ({
    ...prevState,
    email: event.target.value,
  }));
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => setUser(prevState => ({
    ...prevState,
    password: event.target.value,
  }));

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/login', user);
      toast.success(response.data.message);
      router.push('/');
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      {isLoading ? <Spinner /> : null}
      <div className="auth-form flex flex-col gap-3">
        <h1 className="text-2xl">
          Login
        </h1>
        <hr />
        <Input
          label="Email"
          type="email"
          name="email"
          value={user.email}
          onChange={onEmailChange}
          error={user.email.trim().length === 0 || !user.email.includes('@') ? 'Please, enter your email' : ''}
          placeholder="Enter your email"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={user.password}
          onChange={onPasswordChange}
          error={user.password.trim().length < 8 ? 'Password must be at least 8 characters' : ''}
          placeholder="Enter your password"
        />

        <button
          onClick={onSubmit}
          disabled={buttonDisabled}
          className={buttonDisabled ? 'disabled-btn' : ''}
        >
          Login
        </button>

        <Link href='/register'>
          Don&apos;t have account yet? Register
        </Link>
        <Link href='/resetpassword'>
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}

export default LoginPage