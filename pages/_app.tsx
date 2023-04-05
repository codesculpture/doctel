import { useEffect, useState } from 'react'
import '../styles/globals.css'
import Link from "next/link"
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged, signOut, } from "firebase/auth"
import { firebaseConfig } from "../firebase/config.ts";
import { getAuth } from 'firebase/auth' 
import { initializeApp } from 'firebase/app';
import { User } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { verifyUser } from '../firebase/handleAuth';


export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User| null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    let initial = true;
    onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if(user){
        setUser(user);

        if(initial && !user.emailVerified) toast(<div>Please <Link className='italic text-primC' href="/profile">Verify</Link> your Email</div>, {
          type: "warning",
          
        }) 
      }
      else setUser(null);
      setLoading(false);
    })
  },[])
  return loading ? <div> Loading </div> :
    <><Component {...pageProps} user={user}/><ToastContainer/></>
  
}

