import { Dispatch, FC, SetStateAction } from 'react';
import { AuthForms, Field } from '../../../../shared/constants';
import TextInput from '../../../../components/inputs/TextInput.tsx';
import { useTranslation } from 'react-i18next';
import useToast from '../../../../shared/hooks/useToast.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '../../../../shared/validation';
import { checkEmail } from '../../../../services/endpoints/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase.ts';
import Button from '../../../../components/buttons/Button.tsx';
import s from './Forms.module.scss';

interface Props {
	setCurrentForm: Dispatch<SetStateAction<AuthForms>>;
}

const ForgotPassword: FC<Props> = ({ setCurrentForm }) => {
	const { t } = useTranslation();
	const { notifyError, notifySuccess } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ [Field.EMAIL]: string }>({
		resolver: zodResolver(EmailSchema),
	});

	const onSubmit: SubmitHandler<{ email: string }> = async (data): Promise<void> => {
		try {
			const res = await checkEmail({ email: data.email });
			if (res) {
				await sendPasswordResetEmail(auth, data.email);
				notifySuccess(t('response.success.sendVerifyEmail'));
				localStorage.setItem('changePassword', 'true');
				setCurrentForm(AuthForms.SignIn);
			} else {
				notifyError(t('response.error.emailNoExist'));
			}
		} catch (error) {
			notifyError(error.message);
		}
	};

	return (
		<>
			<h1 className={s.form__title}>{t('home.forgotPassword')}</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>{t('home.enterEmail')}</p>
				<TextInput
					register={register(Field.EMAIL)}
					className={s.input}
					name={Field.EMAIL}
					error={errors.email?.message}
				/>
				<p className={s.form__text}>{t('home.weSendEmail')}</p>
				<Button
					type={'submit'}
					value={t('general.send')}
					className={s.button}
					disabled={Object.keys(errors).length > 0}
				/>
			</form>
		</>
	);
};

export default ForgotPassword;
