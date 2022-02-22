import { auth, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { IUser } from "../../models/User";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

axios.defaults.baseURL =
  process.env.NODE_ENV === "PRODUCTION"
    ? "https://henry-social-back.herokuapp.com"
    : "http://localhost:3001";

async function defaultUsername(name: string | null): Promise<string> {
  name = name ?? "username";
  const refactor = name.toLowerCase().split(" ").join("-");
  const foundUserWithTheSameUsername = await axios
    .post("/findUser", {
      username: refactor,
    })
    .then((e) => e.data);
  console.log(foundUserWithTheSameUsername);
  if (foundUserWithTheSameUsername)
    return defaultUsername(name + Math.floor(Math.random() * 10));
  else return refactor;
}
export const closeSession = () => {
  return signOut(auth);
};
export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export async function signUpWithEmail(userInfo: IUser) {
  const { name, username, email, avatar, password } = userInfo;
  if (password == undefined)
    throw new Error("Necesitas ingresar una contraseña");
  try {
    let downloadURL;
    if (avatar instanceof File) {
      const storageRef = ref(storage, "avatars/" + avatar.name);
      downloadURL = await uploadBytes(storageRef, avatar).then((snapshot) => {
        console.log("Snapshot", snapshot);
        return getDownloadURL(snapshot.ref).then((downloadURL) => {
          return downloadURL;
        });
      });
    }
    await axios
      .post("/user", {
        name,
        username,
        email,
        avatar: downloadURL,
      })
      .then((doc) => {
        console.log(doc.data);
        if (password)
          return createUserWithEmailAndPassword(auth, email, password);
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    throw new Error("ERROR " + e);
  }
}

export function signUpWithGmail() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { email, displayName, photoURL } = result.user;
      const username = await defaultUsername(displayName);

      try {
        await axios.post("/user", {
          name: displayName,
          email,
          avatar: photoURL,
          username,
        });
      } catch (e) {
        throw new Error("ERROR" + e);
      }
      return result.user;
    })
    .catch((e) => {
      console.error("Ha ocurrido un error", e);
    });
}

export function signUpWithGitHub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { email, displayName, photoURL } = result.user;
      const username = await defaultUsername(displayName);
      try {
        await axios.post("/user", {
          name: displayName,
          email,
          avatar: photoURL,
          username,
        });
      } catch (e) {
        throw new Error("ERROR" + e);
      }
      return result.user;
    })
    .catch((e) => {
      throw new Error("Algo salio mal" + e);
    });
}
