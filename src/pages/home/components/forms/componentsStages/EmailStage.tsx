import { Dispatch, FC, SetStateAction } from 'react';
import s from '../Forms.module.scss';
import TextInput from '../../../../../components/inputs/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../../../components/buttons/Button';
import { Field, ForgotPasswordStage } from '../../../../../shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '../../../../../shared/validation';
import { useTranslation } from 'react-i18next';

const EmailStage: FC<{ setStage: Dispatch<SetStateAction<ForgotPasswordStage>> }> = ({ setStage }) => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ [Field.EMAIL]: string }>({
		resolver: zodResolver(EmailSchema),
	});

	const onSubmit: SubmitHandler<{ email: string }> = async (data): Promise<void> => {
		try {
			// const res = await api.auth.forgotPassword({ email: data.email });
			// localStorage.setItem('temp_token', res.data);
			localStorage.setItem('email', data.email);
			setStage(ForgotPasswordStage.CHECK_CODE);
		} catch (e) {
			console.error(e);
		}
	};

	console.log('errors', errors);

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
				<p className={s.form__text}>{t('home.weSendCode')}</p>
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

export default EmailStage;
