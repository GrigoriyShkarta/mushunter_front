import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAXJmfmjNOgFfJ0lmIEyFmAPSGTZKL2XfQ',
	authDomain: 'mushunter-11a47.firebaseapp.com',
	projectId: 'mushunter-11a47',
	storageBucket: 'mushunter-11a47.appspot.com',
	messagingSenderId: '904087062857',
	appId: '1:904087062857:web:54325812de69c709f63298',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
