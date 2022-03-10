import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { IUser } from "../../../src/models/User";
import axios from "axios";
import { uploadFile } from "./Helpers/uploadFile";

async function defaultUsername(name: string | null): Promise<string> {
  name = name ?? "username";
  const refactor = name.toLowerCase().split(" ").join("-");
  const foundUserWithTheSameUsername = await axios
    .post("/findUser", {
      username: refactor,
    })
    .then((e) => e.data);
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
    const downloadURL =
      avatar instanceof File
        ? uploadFile(avatar)
        : "https://s5.postimg.cc/537jajaxj/default.png";

    if (password)
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential)
            sendEmailVerification(userCredential?.user, {
              url: "http://localhost:3000",
            });
          axios.post("/user", {
            name,
            username,
            email,
            avatar: downloadURL,
            uid: userCredential.user.uid,
          });
        })
        .catch((e) => {
          if (e.message === "EMAIL_EXIST") {
            throw new Error("Ya existe una cuenta con ese usuario");
          }
        });
  } catch (e: any) {
    throw new Error("ERROR " + e);
  }
}

export function signUpWithGmail() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then(async (result) => {
      const { email, displayName, photoURL, uid } = result.user;
      const username = await defaultUsername(displayName);

      try {
        await axios.post("/user", {
          name: displayName,
          email,
          avatar: photoURL,
          username,
          uid,
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
      const { email, displayName, photoURL, uid } = result.user;
      const username = await defaultUsername(displayName);
      try {
        await axios.post("/user", {
          name: displayName,
          email,
          avatar: photoURL,
          username,
          uid,
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
