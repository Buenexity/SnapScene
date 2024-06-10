import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function uploadFile(file, folderName = "user_images") {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file selected");
      return;
    }

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`${folderName}/${file.name}`);
    const uploadTask = fileRef.put(file);

    uploadTask
      .then(() => {
        fileRef.getDownloadURL().then(resolve).catch(reject);
      })
      .catch(reject);
  });
}

export default uploadFile;
