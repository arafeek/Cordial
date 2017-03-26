import * as firebase from 'firebase';
import config from './config';
import RNFetchBlob from 'react-native-fetch-blob';
import { Platform } from 'react-native';

var getUUID = require('uuid-by-string');

// Set up firebase
const firebaseRef = firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
});

let storageRef = firebase.storage().ref();

// Set up Blob polyfills
// based off of https://github.com/CodeLinkIO/Firebase-Image-Upload-React-Native/blob/master/demo.js
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob

export function put(name, path, dataString) {
  // must genrate a id for the image
  let imageId = getUUID(name);
  debugger;
  // must make a ref to the file in firebase first
  let imageRef = storageRef.child(path + imageId)
  // returns an UplodTask promise that resolves with various status conditions
  // see: https://firebase.google.com/docs/storage/web/upload-files
  return imageRef.putString(dataString);
}

export function uploadImage(name, uri, mime = 'application/octet-stream') {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;
    const imageId = getUUID(name);
    const imageRef = storageRef.child('images/' + imageId);

    RNFetchBlob.fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, {
          type: mime + ';BASE64',
        });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  })
}
// export function get(imageId) {
//   return storageRef.child('images/' + imageId).getDownloadURL();
// }
