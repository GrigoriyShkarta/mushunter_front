import { FC, useState } from 'react';
import s from './Container.module.scss';
import SignIn from './forms/SignIn';
import Registration from './forms/Registration';
import ForgotPassword from './forms/ForgotPassword';
import ConfirmRegistration from './forms/ConfirmRegistration';
import { useTranslation } from 'react-i18next';
import { AuthForms } from '../../../shared/constants';

const Form: FC = () => {
	const [currentForm, setCurrentForm] = useState(AuthForms.SignIn);
	const { t } = useTranslation();

	const getForm = (): JSX.Element => {
		switch (currentForm) {
			case AuthForms.SignIn:
				return <SignIn setCurrentForm={setCurrentForm} />;
			case AuthForms.Registration:
				return <Registration setCurrentForm={setCurrentForm} />;
			case AuthForms.ForgotPassword:
				return <ForgotPassword />;
			case AuthForms.ConfirmRegistration:
				return <ConfirmRegistration />;
		}
	};

	return (
		<div className={s.form}>
			{getForm()}
			{currentForm === AuthForms.Registration && (
				<p className={s.returnToSignIn}>
					{t('home.alreadyOnMH')}
					<span className={s.returnToSignIn_link} onClick={(): void => setCurrentForm(AuthForms.SignIn)}>
						{t('home.signIn')}
					</span>
				</p>
			)}
		</div>
	);
};

export default Form;
