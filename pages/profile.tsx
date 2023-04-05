import Verify from "../components/Verify"
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { verifyUser } from "../firebase/handleAuth";
import { toast } from "react-toastify";
import { ProfileTabs } from "../types/shared";
import PersonalCard from "../components/Tabs/PersonalCard";

function Profile({user}: {user: User}) {
  const [sendVerify, setSendVerify] = useState(false);
  const [currentTab, setCurrentTab] = useState<ProfileTabs>(ProfileTabs.PersonalInfo);

  const handleVerify = async () => {
    setSendVerify(true);
    const err = await verifyUser(user);
    if(err){
      toast(err, { type: "error"});
      setSendVerify(false);
    }
  }
  return (
    <div className="min-h-screen gap-11 flex flex-col">
        <h1 className="text-center text-primC text-3xl italic">
            Your Profile
        </h1>
        {!user.emailVerified ? (!user.emailVerified  && sendVerify) ? <Verify /> : !sendVerify ? <button onClick={() => handleVerify()}>Verify </button> : null : null}
      <div className="flex flex-col sm:gap-28 sm:flex-row text-center justify-center gap-10 px-6">
        <div className="rounded-lg flex justify-center w-36 h-8 bg-primC bg-opacity-20"><button>Personal Info </button></div>
        <div className="rounded-lg flex justify-center w-36 h-8 bg-primC bg-opacity-20"><button>Previous Calls</button></div>
        <div className="rounded-lg flex justify-center w-36 h-8 bg-primC bg-opacity-20"><button>Appointments</button></div>
      </div>  
      {
        currentTab === ProfileTabs.PersonalInfo && <PersonalCard />
      }
    </div>
  )
}

export default Profile