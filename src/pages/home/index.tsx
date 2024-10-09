import { FC, useEffect } from 'react';
import Description from './components/Description';
import Form from './components/Form';
import s from './style.module.scss';
import { useUserStore } from '../profile/store';
import { useNavigate } from 'react-router-dom';
import useToast from '../../shared/hooks/useToast.ts';
import { RegisterSchemaType } from '../../services/endpoints/auth/schema';

const HomePage: FC = () => {
	const { registrationUser, profile, error } = useUserStore();
	const { notifySuccess, notifyError } = useToast();
	const navigate = useNavigate();

	useEffect(() => {
		if (profile) {
			navigate('/user');
			return;
		}

		const checkSignUp = async (): Promise<void> => {
			const tempUserStr = localStorage.getItem('temp_user');
			try {
				if (tempUserStr) {
					const tempUser = JSON.parse(tempUserStr) as RegisterSchemaType;
					registrationUser(tempUser);
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
