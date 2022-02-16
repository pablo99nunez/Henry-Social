import {auth} from './firebase'
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

export function signUpWithEmail(email:string,password:string){
    return createUserWithEmailAndPassword(auth,email,password)
}
export function signUpWithGmail(){
    const provider= new GoogleAuthProvider()
    return signInWithPopup(auth,provider).then(result=>{
        const credential=GoogleAuthProvider.credentialFromResult(result)
        const token =  credential?.accessToken
        return result.user
    }).catch(e=>{
        console.error("Ha ocurrido un error",e)
    })
}