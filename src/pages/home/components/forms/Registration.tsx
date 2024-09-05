import { Dispatch, FC, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../../../components/inputs/TextInput';
import PasswordInput from '../../../../components/inputs/PasswordInput';
import Button from '../../../../components/buttons/Button';
import s from './Forms.module.scss';
import { useTranslation } from 'react-i18next';
import { AuthForms, Field } from '../../../../shared/constants';
import { RegisterSchema } from '../../../../shared/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../../../../firebase.ts';
import useToast from '../../../../shared/hooks/useToast.ts';
import { checkEmail } from '../../../../services/endpoints/auth';

interface IRegistrationData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	confirmPassword: string;
	responseError?: string;
}

interface IRegistrationProps {
	setCurrentForm: Dispatch<SetStateAction<AuthForms>>;
}

const Registration: FC<IRegistrationProps> = ({ setCurrentForm }) => {
	const { t } = useTranslation();
	const { notifySuccess, notifyError } = useToast();
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IRegistrationData>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onBlur',
	});

	const onSubmit: SubmitHandler<IRegistrationData> = async (data): Promise<void> => {
		if (data.password !== data.confirmPassword) {
			setError(Field.CONFIRM_PASSWORD, {
				type: 'custom',
				message: t('validation.beMatch'),
			});
		} else {
			const actionCodeSettings = {
				url: 'http://localhost:5173/',
				handleCodeInApp: true,
			};
			try {
				setLoading(true);
				const res = await checkEmail({ [Field.EMAIL]: data.email });
				if (!res) {
					await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
					const tempUser = {
						[Field.NAME]: data.firstname,
						[Field.LAST_NAME]: data.lastname,
						[Field.EMAIL]: data.email,
						[Field.PASSWORD]: data.password,
					};
					window.localStorage.setItem('temp_user', JSON.stringify(tempUser));
					notifySuccess(t('response.success.sendVerifyEmail'));
					setCurrentForm(AuthForms.ConfirmRegistration);
				} else {
					notifyError(t('response.error.emailAlreadyExist'));
				}
			} catch (e) {
				console.error(e);
				notifyError(t('response.error.registerError') + e.message);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<>
			<h1 className={s.form__title}>{t('home.welcome')}</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.namesWrapper}>
					<div className={s.name}>
						<TextInput
							register={register(Field.NAME)}
							className={s.input}
							name={Field.NAME}
							error={errors.firstname?.message}
						/>
					</div>
					<div className={s.name}>
						<TextInput
							register={register(Field.LAST_NAME)}
							className={s.input}
							name={Field.LAST_NAME}
							error={errors.lastname?.message}
						/>
					</div>
				</div>
				<TextInput
					register={register(Field.EMAIL)}
					className={s.input}
					name={Field.EMAIL}
					error={errors.email?.message}
				/>
				<PasswordInput
					register={register(Field.PASSWORD)}
					className={s.input}
					name={Field.PASSWORD}
					error={errors.password?.message}
				/>
				<PasswordInput
					register={register(Field.CONFIRM_PASSWORD)}
					className={s.input}
					name={Field.CONFIRM_PASSWORD}
					error={errors.confirmPassword?.message}
				/>
				<Button
					type="submit"
					value={t('general.send')}
					className={s.button}
					disabled={Object.keys(errors).length > 0 && !errors.responseError}
					loading={loading}
				/>
			</form>
		</>
	);
};

export default Registration;
