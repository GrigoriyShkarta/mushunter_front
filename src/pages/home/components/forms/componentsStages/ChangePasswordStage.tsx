import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from '../Forms.module.scss';
import PasswordInput from '../../../../../components/inputs/PasswordInput';
import Button from '../../../../../components/buttons/Button';
import api from '../../../../../services/api';

const ChangePasswordStage: FC = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<{ newPassword: string; checkPassword: string;  responseError?: string}>();

	const onSubmit: SubmitHandler<{ newPassword: string; checkPassword: string }> = async (data): Promise<void> => {
		if (data.newPassword !== data.checkPassword) {
			setError('checkPassword', {
				type: 'custom',
				message: 'passwords must be match',
			});
		} else {
			const tempToken = localStorage.getItem('temp_token');

			if (tempToken) {
				try {
					await api.auth.changePassword({
						tempToken,
						newPassword: data.newPassword,
					})
					localStorage.removeItem('temp_token');
					localStorage.removeItem('email');
				} catch (e) {
					setError('responseError', {
						type: 'custom',
						message: 'something went wrong, please refresh the page or try again later',
					});
				}
			}
		}
	};

	return (
		<>
			<h1 className={s.form__title}>Choose a new password</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>
					To secure your account, choose a strong password you haven’t used before and is at least 8
					characters long.
				</p>
				<PasswordInput
					register={register('newPassword', {
						required: 'field password must be required!',
						min: {
							value: 8,
							message: 'the password must contain at least 8 characters',
						},
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message: 'the password must contain latin letters and numbers',
						},
					})}
					className={s.input}
					name={'New password'}
					error={errors.newPassword?.message}
				/>
				<div className={s.errorField}>
					{errors.newPassword?.message && (
						<span className={s.errorText}>{errors.newPassword.message}</span>
					)}
				</div>
				<PasswordInput
					register={register('checkPassword', {
						required: 'field checkPassword must be required!',
					})}
					className={s.input}
					name={'Retype new password'}
					error={errors.checkPassword?.message}
				/>
				<div className={s.errorField}>
					{errors.checkPassword?.message && (
						<span className={s.errorText}>{errors.checkPassword.message}</span>
					)}
				</div>
				{errors.responseError &&
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.responseError.message}</span>
					</div>
				}
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

export default ChangePasswordStage;
