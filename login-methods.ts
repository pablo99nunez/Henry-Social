import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { User } from './src/models/User';

const url = 'http://localhost:3001';

export async function signUpWithEmail(userInfo: User) {
  const { name, username, email, avatar, password } = userInfo;
  if (password == undefined) throw new Error('Necesitas ingresar una contraseña');
  try {
    await fetch(url + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        avatar,
      }),
    });
  } catch (e) {
    alert('ERROR' + e);
  }
  return createUserWithEmailAndPassword(auth, email, password);
}
export function signUpWithGmail() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { email, displayName, photoURL } = result.user;
      try {
        await fetch(url + '/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: displayName,
            email,
            avatar: photoURL,
          }),
        });
      } catch (e) {
        alert('ERROR' + e);
      }
      return result.user;
    })
    .catch((e) => {
      console.error('Ha ocurrido un error', e);
    });
}
export function signUpWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { email, displayName, photoURL } = result.user;
      try {
        await fetch(url + '/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: displayName,
            email,
            avatar: photoURL,
          }),
        });
      } catch (e) {
        alert('ERROR' + e);
      }
      return result.user;
    })
    .catch((e) => {
      throw new Error('Algo salio mal' + e);
    });
}
