import { FC, ReactNode } from 'react';
import s from './style.module.scss';
import Modal from '../../modals';
import { useModalStore } from '../../modals/store.ts';
import { useNavigate } from 'react-router-dom';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import { useUserStore } from '../../../pages/profile/store';
import SocialMediaAuthModal from '../../modals/socialMediaAuthModal';
import { useTranslation } from 'react-i18next';
import { Field } from '../../../shared/constants';

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
							[Field.EMAIL]: tokenResponse.email,
							[Field.FIRST_NAME]: tokenResponse.firstName,
							[Field.LAST_NAME]: tokenResponse.lastName,
							[Field.AVATAR]: tokenResponse.photoUrl,
						});
						// localStorage.setItem('emailForRegistration', res.profile.email);
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
