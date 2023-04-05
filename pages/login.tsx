import { AuthError, User } from "firebase/auth"
import Link from "next/link"
import { useEffect, useState } from "react";
import { signIn } from "../firebase/handleAuth";
import { toast } from "react-toastify"
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import Redirect from "../components/Redirect";
// import Redirect from "../components/Redirect";


function Login({user} : {user: User | null}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    const err = await signIn(email, pass);
    if(err){
      toast(err, {type: "error"});
    }
    setLoading(false);
  }
  return user ? <Redirect path="/profile"/>: (
    <div className="absolute min-w-full min-h-full flex sm:flex-row flex-col justify-center items-center">
        <div className="w-full text-center sm:p-0 text-3xl sm:text-5xl pb-5 italic">Login </div>
        <div className="h-full bg-primC rounded-xl bg-opacity-20 text-center">
          <div className="w-96  h-auto text-center text-xl">
          <div className="pt-10 p-5 text-primT">
            Email
              </div>
            <div className="text-primT">
              <input placeholder="your@example.com" onChange={(e) => setEmail(e.target.value) } value={email} type="email" className="w-80 h-14 focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
              </div>
              <div className="pt-10 p-5 text-primT">
            Password
              </div>
            <div className="pb-16 text-primT">
              <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="secret" className="w-80 h-14 
              focus:border-2 cursor caret-primC
               focus:border-primC focus:outline-none
                rounded-lg text-center"/>
               </div>
            <div className="pb-6 text-xl text-[#fff]">
              {loading ? <div>Please Wait...</div> :
              <button onClick={handleSignin} className="rounded-lg bg-primC w-40 h-10">
                Get in
                </button>
                }
            </div>
          </div>
        
        </div>
        <div className="w-full italic text-primC sm:p-0 pt-5 sm:text-5xl text-center text-3xl">
            <Link href="/signup">New Here? </Link>
        </div>
    </div>
  )
}

export default Login;