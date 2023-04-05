import { UserData } from "../../types/shared";
import { get, getDatabase, query, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

const saveUserData = async (userData: UserData): Promise<null | string> => {
    const db = getDatabase();
    const auth = getAuth();

    const path = 'userProfile/' + auth.currentUser?.uid;

    await set(ref(db, path), userData).catch(err => {
        return "Cant save User Data"
    })

    return null;
}

const getUserData = async (): Promise<UserData | null> =>  {
    
    const db = getDatabase();
    const auth = getAuth();

    const path = 'userProfile/' + auth.currentUser?.uid;

    try{
    const snapshot = await get(ref(db, path));
    if(!snapshot.exists()){
        return null;
    }
    return snapshot.val() as UserData;
    }
    catch(e){
        console.log(e);
        return null;
    }
    
}

export { saveUserData, getUserData };