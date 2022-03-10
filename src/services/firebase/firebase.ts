import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../client/src/firebase/firebase";

const firebaseAdmin =
  initializeApp(/* {
  credential: applicationDefault(),
} */);

export const auth = getAuth(app);
