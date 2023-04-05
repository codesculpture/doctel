import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

import { reload } from "firebase/auth";

const AUTH_ERR_MSG = new Map<string, string>([
    ["auth/user-disabled","You have been Disabled Temporarily"],
    ["auth/network-request-failed", "Seems Poor Internet Connection"],
    ["auth/wrong-password", "Your email or password is Wrong"],
    ["auth/weak-password", "Your Password seems weak"],
    ["auth/too-many-requests", "You Sent Maximum of Verification Email"],
    ["auth/email-already-in-use", "It seems the email is already registered"]]);


const signIn = (email: string, pass: string): Promise<string | null> => {
    const auth = getAuth();

    return new Promise((res) => {
        signInWithEmailAndPassword(auth, email, pass).then(() =>{
        res(null);
        }).catch((err) => {
            let msg;
            if(err instanceof FirebaseError){
                msg = AUTH_ERR_MSG.get(err.code);
            }
            msg ??= "Something Wrong with Server";
            res(msg);
        })
    });
}

const signout = () => {
    const auth = getAuth();
    signOut(auth);
}

const registerUser = (email:string, pass:string, userName: string): Promise<string | null> => {
    const auth = getAuth();

    return new Promise((res) => {
        createUserWithEmailAndPassword(auth, email, pass).then(({user}) => {
            verifyUser(user);
            res(null);
        }).catch(err => {
            if(err instanceof FirebaseError){
                let msg = AUTH_ERR_MSG.get(err.code);
                msg ??= "Something Wrong with Server";
                res(msg);
            }
            res(err);
        })
    })
}

const verifyUser = async (user: User | null = getCurrentUser()): Promise<string | null> => {
    
    return new Promise((res) => {
        if(user) {
            if(user.emailVerified){
                res("Already Verified");
                return;
            }
            sendEmailVerification(user).then(() => {
              res(null);  
            }).catch((err) => {
                let msg = AUTH_ERR_MSG.get(err.code);
                msg ??= "Something Wrong with Server, Please Reload"
                res(msg);
            })
            return;
        }
         res("Can't Send Verification to Non-Logged User")
    });
    
}


const checkUserVerified = ():boolean | undefined => {
    const user = getAuth();
    if(!user.currentUser){
        return false;
    }
    reload(user.currentUser);
    const { currentUser } = getAuth();
    return currentUser?.emailVerified;
}

const getCurrentUser = () => {
    return getAuth().currentUser;
}


export {signIn, signout, registerUser, verifyUser, checkUserVerified};