import {auth} from './firebase'
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth'



export function signUpWithEmail(email:string,password:string){
    return createUserWithEmailAndPassword(auth,email,password)
}
export function signUpWithGmail(){
    const provider= new GoogleAuthProvider()
    return signInWithPopup(auth,provider).then(result=>{
        
        return result.user
    
    }).catch(e=>{
        console.error("Ha ocurrido un error",e)
    })
}
export function signUpWithGitHub(){
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth,provider).then(result=>{

        return result.user
    }).catch(e=>{
        throw new Error("Algo salio mal"+e)
    })
}