import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export async function uploadFile(avatar: File) {
  const storageRef = ref(storage, "avatars/" + avatar.name);
  const downloadURL = await uploadBytes(storageRef, avatar).then((snapshot) => {
    return getDownloadURL(snapshot.ref).then((downloadURL) => {
      return downloadURL;
    });
  });
  return downloadURL;
}
