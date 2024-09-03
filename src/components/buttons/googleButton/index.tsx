import { FC } from 'react';
import { auth, provider } from '../../../firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import s from './GoogleButton.module.scss';

const GoogleButton: FC = () => {
	const handleClick = async (): Promise<void> => {
		const res = await signInWithPopup(auth, provider);
		if (res.user) {
			console.log('hi!');
		}
	};

	return (
		<button type="button" className={s.button} onClick={handleClick}>
			Sign with Google <FcGoogle />
		</button>
	);
};

export default GoogleButton;
