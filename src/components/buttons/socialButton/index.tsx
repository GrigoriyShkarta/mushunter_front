import { FC, ReactNode } from 'react';
import s from './style.module.scss';
import Modal from '../../modals';
import { useModalStore } from '../../modals/store.ts';
import { useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import { useUserStore } from '../../../pages/user/store';
import SocialMediaAuthModal from '../../modals/socialMediaAuthModal';
import { useTranslation } from 'react-i18next';

interface Props {
	name: string;
	icon: ReactNode;
	provider: GoogleAuthProvider | FacebookAuthProvider;
}

const SocialButton: FC<Props> = ({ name, icon, provider }) => {
	const { setIsOpen, setTitle, setChildren } = useModalStore();
	const { registrationUser, socialAuth } = useUserStore();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleClick = async (): Promise<void> => {
		try {
			provider.addScope('email profile');
			const res = await signInWithPopup(auth, provider);
			const tokenResponse = (res as any)._tokenResponse;
			if (res.user.email) {
				const checkAuth = await socialAuth({ email: res.user.email });
				if (!checkAuth) {
					if (tokenResponse.firstName && tokenResponse.lastName && tokenResponse.email) {
						registrationUser({
							email: tokenResponse.email,
							firstname: tokenResponse.firstName,
							lastname: tokenResponse.lastName,
						});
						// localStorage.setItem('emailForRegistration', res.user.email);
						// setTitle(t('home.registration'));
						// setChildren(<SocialMediaAuthModal />);
						// setIsOpen(true);
					} else {
						localStorage.setItem('emailForRegistration', res.user.email);
						setTitle(t('home.registration'));
						setChildren(<SocialMediaAuthModal />);
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
