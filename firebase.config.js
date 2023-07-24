
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(process.env.NEXT_PUBLIC_FIREBAS_API_KEYS);
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBAS_API_KEYS,
    authDomain: process.env.NEXT_PUBLIC_FIREBAS_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBAS_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBAS_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBAS_MSGID,
    appId: process.env.NEXT_PUBLIC_FIREBAS_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBAS_MEASID
  };

export default firebaseConfig
  