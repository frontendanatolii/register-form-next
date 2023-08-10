'use client'
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "./Spinner";

function LayoutProvider({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isLayoutNotRequiredPage = pathname === '/login' || pathname === '/register' || pathname === '/verifyemail' || pathname === '/resetpassword';

  const onLogout =async () => {
    try {
      setIsLoading(true);
      await axios.post('/api/users/logout');
      toast.success('Successfully logout')
      router.push('/login')
    } catch (error) {
      toast.error('Error with logout')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? <Spinner /> : null}
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
        rel="stylesheet"
      ></link>
        <Toaster />
        {!isLayoutNotRequiredPage
          ? (
              <div className="flex justify-between items-center gap-3  header">
                <h1>Next Auth</h1>

                <div className="flex items-center gap-3">
                  <Link href="/">Home</Link>
                  <Link href="/profile">Profile</Link>
                  <i className="ri-logout-box-r-line" onClick={onLogout}></i>
                </div>
              </div>
          ) : null
        }
      <div className="p-3">{children}</div>
    </div>
  );
}

export default LayoutProvider;