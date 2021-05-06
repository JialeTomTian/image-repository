import firebase from "@firebase/app";
import "@firebase/storage";
import axios from "axios";

const uploadFireBase = async (accessToken, blobUrl, name) => {
  const firebaseConfig = await axios.get("api/private/getUploadURL", {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  if (!firebase.apps?.length) {
    console.log("got here");
    firebase.initializeApp(firebaseConfig.data);
  }

  const storage = firebase.storage();
  if (!blobUrl || !name) return null;

  try {
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const snapshot = await storage.ref().child(name).put(blob);
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    console.log(error);
  }
};

export default uploadFireBase;
