import { User } from "firebase/auth";
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Redirect from "../components/Redirect";
import Verify from "../components/Verify";
import { registerUser } from "../firebase/handleAuth";

function Signup({user} : {user : User}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifyScreen, setVerifyScreen] = useState(false);


  const handleRegister = async () => {
    const err = await registerUser(email, pass, name);
    if(err) {
      toast(err, {type: "error"});
      return;
    }
    setVerifyScreen(true);
    toast("Registered Successfully");
  }

    return (user && verifyScreen) ?  <Verify/> : user ?  <Redirect path="/profile"/> : (
      <div className="absolute min-w-full min-h-full flex sm:flex-row flex-col justify-center items-center">
          <div className="w-full text-center sm:p-0 text-3xl sm:text-5xl pb-5 italic">Sign up</div>
          <div className="h-full bg-primC rounded-xl bg-opacity-20 text-center">
            <div className="w-96  h-auto text-center text-xl">
            <div className="sm:pt-10 p-5 text-primT">
              Full Name
                </div>
                <div className="text-primT">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Peter Parker" type="email" className="w-80 h-14 focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
                </div>
            <div className="sm:pt-10 p-5 text-primT">
              Email
                </div>
              <div className="text-primT">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@example.com" type="email" className="w-80 h-14 focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
                </div>
                <div className="sm:pt-10 p-5 text-primT">
              Password
                </div>
              <div className="sm:pb-16 pb-8 text-primT">
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="secret" className="w-80 h-14 
                focus:border-2 cursor caret-primC
                 focus:border-primC focus:outline-none
                  rounded-lg text-center"/>
                 </div>
              <div className="pb-6 text-xl text-[#fff]">
                {loading ? <div>Please Wait...</div> :
                <button onClick={handleRegister} className="rounded-lg bg-primC w-40 h-10">
                  Create
                  </button>
}
              </div>
            </div>
          
          </div>
          <div className="w-full italic text-primC sm:p-0 pt-5 sm:text-5xl text-center text-3xl">
              <Link href="/login">Login?</Link>
          </div>
      </div>
    )
  }
  
  export default Signup;