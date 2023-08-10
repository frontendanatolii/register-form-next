'use client';
import Input from "@/components/Input"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "@/components/Spinner";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
 
function RegisterPage() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    userName: '',
    password: '',
    email: '',
  });

  useEffect(() => {
    const userDataIsValid = user.userName.trim().length !== 0 && user.email.trim().length !== 0 && user.email.includes('@') && user.password.trim().length >= 8;

    if (userDataIsValid) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => setUser(prevState => ({
    ...prevState,
    userName: event.target.value,
  }));
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
      const response = await axios.post('/api/users/register', user);
      toast.success(response.data.message);
      router.push('/login')
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
          Register
        </h1>
        <hr />
        <Input
          label="Username"
          type="text"
          name="username"
          value={user.userName}
          onChange={onUserNameChange}
          error={user.userName.trim().length === 0 ? 'Please, enter your name' : ''}
          placeholder="Enter your name"
        />
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
          Register
        </button>

        <Link href='/login'>
          Already have an account? Login
        </Link>
      </div>
    </div>
  )
}

export default RegisterPage