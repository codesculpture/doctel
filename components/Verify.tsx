import { User } from "firebase/auth"
import Redirect from "./Redirect"
import {useEffect, useState} from "react";
import { useRouter } from "next/router";
import { checkUserVerified, verifyUser } from "../firebase/handleAuth";

const TIMEOUT = 120;
function Verify() {
    const [timer, setTimer] = useState(TIMEOUT);
    const [isTimeOut, setTimeOut ] = useState(true);
    const { push } = useRouter();

    useEffect(() => {
        startTimer();
        handleVerify();
    },[])

    const handleVerify = () => {
        let verifier = setInterval(() => {

            setTimeOut(t => {
                if(!t){
                    clearInterval(verifier);
                }
                return t;
            })
            const isVerified = checkUserVerified();
            console.log(isVerified, "IS HE");
            if(isVerified) {
                clearInterval(verifier);
                push("/profile");
            }
        }, 2000)
    }

    const startTimer = () => {
        let interval = setInterval(() => {
            setTimer((t) => {
                if(t <= 0){
            clearInterval(interval);
            setTimeOut(false);
                return t;
                }
                else{
                    return t - 1;
                }
            })
        }, 1000)
    }

    const handleResend = () => {
        verifyUser()
        setTimer(TIMEOUT)
        startTimer();
        setTimeOut(true);
        handleVerify();
    }

    
  return  <div className="min-h-screen text-center flex flex-col gap-1 justify-center items-center">
    <div className="text-primT text-3xl">Please Verify Your Email </div>
    <div className="text-primC italic text-xl pb-5">Check your inbox</div>
    <div className="text-primT text-base pb-2">Didn't Received</div>
    {isTimeOut ? timer : <button className="w-16 rounded-lg text-[#fff] bg-primC" onClick={handleResend}>Resend</button>}
  </div>
}

export default Verify