import { FC, useState } from 'react';
import s from './Container.module.scss';
import SignIn from './forms/SignIn';
import Registration from './forms/Registration';
import ForgotPassword from './forms/ForgotPassword';
import ConfirmRegistration from './forms/ConfirmRegistration';

export enum Forms {
	SignIn,
	Registration,
	ForgotPassword,
	ConfirmRegistration,
}

const Form: FC = () => {
	const [currentForm, setCurrentForm] = useState(Forms.SignIn);

	return (
		<div className={s.form}>
			<>
				{currentForm === Forms.SignIn && <SignIn setCurrentForm={setCurrentForm} />}
				{currentForm === Forms.Registration && <Registration setCurrentForm={setCurrentForm} />}
				{currentForm === Forms.ForgotPassword && <ForgotPassword />}
				{currentForm === Forms.ConfirmRegistration && <ConfirmRegistration />}
			</>
			{currentForm === Forms.Registration && (
				<p className={s.returnToSignIn}>
					Already on MusHunter?{' '}
					<span
						className={s.returnToSignIn_link}
						onClick={(): void => setCurrentForm(Forms.SignIn)}
					>
						Sign in
					</span>
				</p>
			)}
		</div>
	);
};

export default Form;
