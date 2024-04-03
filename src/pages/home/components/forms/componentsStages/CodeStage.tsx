import { Dispatch, FC, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../../../components/buttons/Button';
import TextInput from '../../../../../components/inputs/TextInput';
import { ForgotPasswordStage } from '../ForgotPassword';
import s from '../Forms.module.scss';
import api from '../../../../../services/api';

const CodeStage: FC<{ setStage: Dispatch<SetStateAction<any>> }> = ({ setStage }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<{ code: string, responseError: string }>();

	const onSubmit: SubmitHandler<{ code: string }> = async (data): Promise<void> => {
		const email = localStorage.getItem('email');
		const tempToken = localStorage.getItem('temp_token');

		if (email && tempToken) {
			const res = await api.auth.checkTempPassword({
				email: email,
				tempPassword: data.code,
				tempToken
			})

			if (res.data) {
				localStorage.removeItem('email');
				setStage(ForgotPasswordStage.NEW_PASSWORD);
			} else {
				return setError('responseError', {
					type: 'custom',
					message: 'something went wrong, please refresh the page or try again later',
				});
			}
		} else {
			return setError('responseError', {
				type: 'custom',
				message: 'something went wrong, please refresh the page or try again later',
			});
		}
	};

	return (
		<>
			<h1 className={s.form__title}>Enter code</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>
					Check email for a verification code.{' '}
					<span className={s.form__span} onClick={(): void => setStage(ForgotPasswordStage.EMAIL)}>
						Change email
					</span>
				</p>
				<TextInput
					register={register('code', {
						required: 'field code must be required!',
					})}
					className={s.input}
					name={'code'}
					error={errors.code?.message}
				/>
				<p className={s.form__text}>
					If you don't see a code in your inbox, check your spam folder. If it's not there, the
					email address may not be confirmed, or it may not match an existing MusHunter account.
				</p>
				{errors.code?.message && (
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.code.message}</span>
					</div>
				)}
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

export default CodeStage;
