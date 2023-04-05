import { User } from "firebase/auth"
import { useRouter } from "next/router";
import { signout } from "../firebase/handleAuth";

function Home({user}: {user: User}) {
    const { push } = useRouter();
  return (
    <div className="flex absolute min-h-screen min-w-full flex-initial flex-col">
        <div className="flex flex-row-reverse gap-10 pr-10 pt-5">
            {user ? 
            <>
            <div className="dropdown">
            <div className="flex flex-row gap-1">
                <div>
                    Hello,
                   
                </div>
                <div className="text-primC ">
                    Deepak
                </div>
                
            </div>
            <div className="dropdown-content">
                        <a className="hover:underline decoration-primC hover:italic">Profile</a>
                        <a onClick={() => signout()} className="hover:underline decoration-primC hover:italic">Signout</a>
                    </div>
            </div>
            <div>Appointments</div>
            </> :
            <>
             <div className="text-primC ">
                    <a>Learn More</a>
            </div>
                <div className=" cursor-pointer" onClick={() => push("/login")}>
                    Login
                </div>
               
            </>
            }
        </div>
        <div>
        </div>
        <div className=" basis-[500px] flex flex-col items-center justify-center">
            <div className="text-center pb-3 text-primT tracking-wide text-7xl text">Doctel</div>
            <div className="text-center pb-6 text-primT text-3xl tracking-wide">A Place where you cure yourself on the fly</div>
            <div className="flex flex-row justify-center text-lg">
                <div >Feel Sick?</div>
                <div className="pl-1 text-primC">Make a Call</div>
            </div>
        </div>
        <div className="absolute bottom-0 w-full">
            <img src="wave.svg"></img>
        </div>
            </div>
  )
}

export default Home;