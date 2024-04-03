import { Dispatch, FC, SetStateAction } from 'react';
import s from '../Forms.module.scss';
import TextInput from '../../../../../components/inputs/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ForgotPasswordStage } from '../ForgotPassword';
import Button from '../../../../../components/buttons/Button';
import api from '../../../../../services/api';

const EmailStage: FC<{ setStage: Dispatch<SetStateAction<ForgotPasswordStage>> }> = ({ setStage }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string }>();

	const onSubmit: SubmitHandler<{ email: string }> = async (data): Promise<void> => {
		try {
			const res = await api.auth.forgotPassword({email: data.email});
			localStorage.setItem('temp_token', res.data);
			localStorage.setItem('email', data.email)
			setStage(ForgotPasswordStage.CHECK_CODE);
		} catch (e) {
			console.error(e);
		}

	};

	return (
		<>
			<h1 className={s.form__title}>Forgot password</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>Enter your email</p>
				<TextInput
					register={register('email', {
						required: 'field email must be required!',
						pattern: {
							value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
							message: 'enter correct email',
						},
					})}
					className={s.input}
					name={'email'}
					error={errors.email?.message}
				/>
				{errors.email?.message && (
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.email.message}</span>
					</div>
				)}
				<p className={s.form__text}>
					We’ll send a verification code to this email if it matches an existing MusHunter account
				</p>
				<Button
					type={'submit'}
					value={'Send'}
					className={s.button}
					disabled={Object.keys(errors).length > 0}
				/>
			</form>
		</>
	);
};

export default EmailStage;
