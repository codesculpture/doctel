import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserData, saveUserData } from "../../firebase/db/handleProfile";
import { UserData } from "../../types/shared";

function PersonalCard() {

  const initUserData: UserData = {name: "", dob: "", weight: "", gender: "male"}
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>(initUserData);
  
  useEffect(() => {
     handleGetData();
  },[])


  const handleGetData = async () => {
    const data = await getUserData();
    if(data){
      setUserData(data);
    }
    console.log(data);

  }
  const handleSaveData = async () => {
    console.log(userData);
    const error = await saveUserData(userData);
    if(error){
      toast.error(error);
    } 
    else {
      toast.success("Saved")
    }
  }

  return (
    <div className="text-xl text-primT bg-primC bg-opacity-20 text-center w-auto">
        <div className="pb-3">
                Name
            </div>
         <div className="text-primT pb-3">
              <input placeholder=""
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              value={userData.name}
              className="focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
          </div> 
          <div className="pb-3">
                Date of Birth
            </div>
         <div className="text-primT pb-3">
              <input placeholder=""
              onChange={(e) => setUserData({...userData, dob: e.target.value})}
              value={userData.dob}
              type="date"
              className="focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
          </div> <div className="pb-3">
                Weight
            </div>
         <div className="text-primT pb-3">
              <input placeholder=""
              onChange={(e) => setUserData({...userData, weight: e.target.value})}
              value={userData.weight}
              className="focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center"/> 
          </div> 
          <div className="pb-3">
                Gender
            </div>
         <div className="text-primT pb-5">
              <select value={userData.gender} 
              onChange={(e) => setUserData({...userData, gender: e.target.value})}
              className="focus:border-2 cursor caret-primC focus:border-primC focus:outline-none rounded-lg text-center">
                <option value="male">Male</option> 
                <option value="female">Female</option>
                <option value="trans">Trans-Gender</option>
              </select>
          </div>
          <div className="pb-6 text-xl text-[#fff]">
              {loading ? <div>Please Wait...</div> :
              <button onClick={() => handleSaveData()} className="rounded-lg bg-primC w-40 h-10">
                Save
                </button>
                }
            </div>
    </div>
  )
}

export default PersonalCard