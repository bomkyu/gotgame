import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, OAuthProvider, getAuth, signInWithPopup  } from "firebase/auth";
import axios from 'axios';
import { useModal } from '../contexts/ModalContext'
const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:process.env.REACT_APP_ID,
    measurementId:process.env.REACT_APP_MEASURMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const GoogleProvider = new GoogleAuthProvider();
const AppleProvider = new OAuthProvider('apple.com');
const auth = getAuth();

export const googleLoginRequest = async ( loginCallBack : Function ) => {
    try {
        const result = await signInWithPopup(auth, GoogleProvider);

        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
        const token = credential.accessToken;
        } else {
        return alert('token값이 NULL입니다!');
        }
        const {displayName, email, uid} = result.user;

        loginCallBack({name : displayName, email, uid})
    } catch (error : unknown) {

        console.log(error);
    }
};

export const kakaoLoginRequest = async ( loginCallBack : Function ) => {
    try {
        const result = await signInWithPopup(auth, AppleProvider);
        const credential = OAuthProvider.credentialFromResult(result);
        if (credential !== null) {
            const token = credential.accessToken;
        } else {
            return alert('token값이 NULL입니다!');
        }
    } catch (error) {
        console.log(error);
    }
}