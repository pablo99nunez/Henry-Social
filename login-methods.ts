import {auth} from './firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export function signUpWithEmail(email:string,password:string){
    return createUserWithEmailAndPassword(auth,email,password)
}
export function signUpWithGmail(){
    return 
}