import { Dispatch, FC, SetStateAction } from 'react';
import { Forms } from '../Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '../../../../components/inputs/TextInput';
import PasswordInput from '../../../../components/inputs/PasswordInput';
import Button from '../../../../components/buttons/Button';
import GoogleButton from '../../../../components/buttons/googleButton';
import api from '../../../../services/api';
import { AxiosResponse } from 'axios';
import s from './Forms.module.scss';

interface IRegistrationData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	responseError?: string;
}

interface IRegistrationProps {
	setCurrentForm: Dispatch<SetStateAction<Forms>>;
}

const Registration: FC<IRegistrationProps> = ({ setCurrentForm }) => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<IRegistrationData>();

	const onSubmit: SubmitHandler<IRegistrationData> = async (data): Promise<void> => {
		if (data.password !== data.confirmPassword) {
			setError('confirmPassword', {
				type: 'custom',
				message: 'passwords must be match',
			});
		} else {
			try {
				const formData = {
					firstname: data.firstName,
					lastname: data.lastName,
					email: data.email,
					password: data.password,
				}
				const res: AxiosResponse = await api.auth.sendMailBeforeRegister(formData)
				localStorage.setItem('temp_token', res.data);
				localStorage.setItem('temp_user', JSON.stringify(formData));
				setCurrentForm(Forms.ConfirmRegistration);
			} catch (e) {
				console.error(e)
				if (e.response.status === 400) {
					setError('responseError', {
						type: 'custom',
						message: e.response.data.message,
					});
				} else {
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
			<h1 className={s.form__title}>Welcome to your musician community!</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={s.namesWrapper}>
					<div className={s.name}>
						<TextInput
							register={register('firstName', {
								required: 'field firstName must be required!',
							})}
							className={s.input}
							name={'firstName'}
							error={errors.firstName?.message}
						/>
						<div className={s.errorField}>
							{errors.email?.message && <span className={s.errorText}>{errors.email.message}</span>}
						</div>
					</div>
					<div className={s.name}>
						<TextInput
							register={register('lastName', {
								required: 'field lastName must be required!',
							})}
							className={s.input}
							name={'lastName'}
							error={errors.lastName?.message}
						/>
						<div className={s.errorField}>
							{errors.email?.message && <span className={s.errorText}>{errors.email.message}</span>}
						</div>
					</div>
				</div>
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
				<div className={s.errorField}>
					{errors.email?.message && <span className={s.errorText}>{errors.email.message}</span>}
				</div>
				<PasswordInput
					register={register('password', {
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
					name={'password'}
					error={errors.password?.message}
				/>
				<div className={s.errorField}>
					{errors.password?.message && (
						<span className={s.errorText}>{errors.password.message}</span>
					)}
				</div>
				<PasswordInput
					register={register('confirmPassword', {
						required: 'field password must be required!',
					})}
					className={s.input}
					name={'confirm password'}
					error={errors.confirmPassword?.message}
				/>
				<div className={s.errorField}>
					{errors.confirmPassword?.message && (
						<span className={s.errorText}>{errors.confirmPassword.message}</span>
					)}
				</div>
				{errors.responseError &&
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.responseError.message}</span>
					</div>
				}
				<Button
					type="submit"
					value={'Send'}
					className={s.button}
					disabled={Object.keys(errors).length > 0 && !errors.responseError}
				/>
				<GoogleButton />
			</form>
		</>
	);
};

export default Registration;
