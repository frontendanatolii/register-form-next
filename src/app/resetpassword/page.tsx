'use client'

import Input from "@/components/Input"
import Spinner from "@/components/Spinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast";

function ResetPasswordPage() {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(window.location.search.split('=')[1] || '');
  }, [token]);

  const resetPassword = async () => {
    try {
      setLoading(true);
      await axios.put('/api/users/resetpassword', {
        token,
        password,
      });
      toast.success('Password reset successfully');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post('/api/users/resetpassword', { email });
      toast.success('Reset password link sent to your email')
    } catch (error: any) {
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center">
      {loading ? <Spinner /> : null}

      {token.length === 0 ? (
        <div className="auth-form flex flex-col gap-3">
          <h1 className="text-2xl">
            Enter your email to receive reset password link
          </h1>
          <hr />
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email.trim().length === 0 || !email.includes('@') ? 'Please, enter your email' : ''}
            placeholder="Enter your email"
          />

          <button
            className={email.length ? '' : 'disabled-btn'}
            onClick={sendEmail}
          >
            Send reset password link
          </button>
        </div>
      ) : (
        <div className="auth-form flex flex-col gap-3">
          <h1 className="text-2xl">
            Enter your password and confirm password
          </h1>
          <hr />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={password.trim().length < 8 ? 'Password must be at least 8 characters' : ''}
            placeholder="Enter your password"
          />
          <Input
            label="Confirm password"
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword.trim().length < 8 || confirmPassword !== password
              ? 'Password must be the same as the password you entered above'
              : ''
            }
            placeholder="Enter your email"
          />

          <button
            className={password.length && confirmPassword === password  ? '' : 'disabled-btn'}
            onClick={resetPassword}
          >
            Reset password
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetPasswordPage