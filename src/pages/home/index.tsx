import { FC, useEffect } from 'react';
import Description from './components/Description';
import Form from './components/Form';
import s from './style.module.scss';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useUserStore } from '../user/store';
import { RegisterSchemaType } from '../../services/endpoints/auth/schema';
import { useNavigate } from 'react-router-dom';
import useToast from '../../shared/hooks/useToast.ts';

const HomePage: FC = () => {
	const { register, user, error } = useUserStore();
	const { notifySuccess, notifyError } = useToast();
	const navigate = useNavigate();
	const auth = getAuth();
	const emailLink = location.href;

	useEffect(() => {
		if (user) {
			navigate('/user');
		}

		const checkSignUp = async (): Promise<void> => {
			if (isSignInWithEmailLink(auth, emailLink)) {
				const tempUserStr = localStorage.getItem('temp_user');
				try {
					if (tempUserStr) {
						const tempUser = JSON.parse(tempUserStr) as RegisterSchemaType;
						await signInWithEmailLink(auth, tempUser.email, emailLink);
						register(tempUser);
						if (!error) {
							notifySuccess('success!');
							localStorage.removeItem('temp_user');
							navigate('/user');
						} else {
							notifyError(error);
						}
					}
				} catch (e) {
					notifyError(e);
				}
			}
		};

		checkSignUp();
	}, []);

	return (
		<div className={s.container}>
			<Description />
			<Form />
		</div>
	);
};

export default HomePage;
