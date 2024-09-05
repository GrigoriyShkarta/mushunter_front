import { FC, ReactNode } from 'react';
import s from './style.module.scss';
import Modal from '../../modals';
import { useModalStore } from '../../modals/store.ts';
import { useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import { authWithSocialMedia } from '../../../services/endpoints/auth';
import { useUserStore } from '../../../pages/user/store';

interface Props {
	name: string;
	icon: ReactNode;
	provider: GoogleAuthProvider | FacebookAuthProvider;
}

const SocialButton: FC<Props> = ({ name, icon, provider }) => {
	const { setIsOpen, setTitle } = useModalStore();
	const { register } = useUserStore();
	const navigate = useNavigate();

	const handleClick = async (): Promise<void> => {
		try {
			provider.addScope('email profile');
			const res = await signInWithPopup(auth, provider);
			const tokenResponse = (res as any)._tokenResponse;
			if (res.user.email) {
				const checkAuth = await authWithSocialMedia({ email: res.user.email });
				if (!checkAuth) {
					if (tokenResponse.firstName && tokenResponse.lastName && tokenResponse.email) {
						register({
							email: tokenResponse.email,
							firstname: tokenResponse.firstName,
							lastname: tokenResponse.lastName,
							password: '123ahb321',
						});
					} else {
						setTitle('My Modal Title');
						setIsOpen(true);
					}
				} else {
					navigate('/user');
				}
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<button type="button" className={s.button} onClick={handleClick}>
				{name} {icon}
			</button>
			<Modal />
		</>
	);
};

export default SocialButton;
