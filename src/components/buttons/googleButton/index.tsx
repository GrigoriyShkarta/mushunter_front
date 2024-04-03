import { FC } from 'react';
import { FcGoogle } from 'react-icons/fc';
import s from './GoogleButton.module.scss';

const GoogleButton: FC = () => {
	return (
		<button type="button" className={s.button}>
			Sign with Google <FcGoogle />
		</button>
	);
};

export default GoogleButton;
