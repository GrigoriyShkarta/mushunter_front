import { FC, Dispatch, SetStateAction, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import TextInput from '../../../../components/inputs/TextInput';
import PasswordInput from '../../../../components/inputs/PasswordInput';
import Button from '../../../../components/buttons/Button';
import GoogleButton from '../../../../components/buttons/googleButton';

import { Forms } from '../Form';

import s from './Forms.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux.ts';
import { login } from '../../../../store/reducers/user/actionCreators.ts';
import { Statuses } from '../../../../shared/constants';
import Loader from '../../../../components/loader';


interface ISignInData {
	email: string;
	password: string;
	responseError?: string;
}

interface ISignInProps {
	setCurrentForm: Dispatch<SetStateAction<Forms>>;
}

const SignIn: FC<ISignInProps> = ({ setCurrentForm }) => {
	const {status, error } = useAppSelector(state => state.userSlice);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ISignInData>();

	useEffect(() => {
		if (status === Statuses.ERROR) {
			console.log('work');
			setError("responseError", {
				type: "manual",
				message: error,
			});
		}
	}, [status]);

	console.log('status', status === Statuses.LOADING);


	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<ISignInData> = (data): void => {
		dispatch(login(data));
	};

	return (
		<>
			<h1 className={s.form__title}>Welcome to your musician community!</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
						minLength: {
							value: 8,
							message: 'the password must contain at least 8 characters',
						},
						pattern: {
							value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]+$/,
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
				<span
					className={s.forgotPassword}
					onClick={(): void => setCurrentForm(Forms.ForgotPassword)}
				>
					Forgot Password?
				</span>
				{errors.responseError?.message && (
					<div className={s.errorResponseField}>
						<span className={s.errorText} style={{textAlign: 'center'}}>{errors.responseError.message}</span>
					</div>
				)}
				<Button
					type="submit"
					value={status === Statuses.LOADING ? <Loader /> :'Sign In'}
					className={s.button}
					disabled={Object.keys(errors).length > 0 && !errors.responseError}
				/>
				<GoogleButton />
				<div className={s.divider}>
					<span className={s.divider__text}>or</span>
				</div>
				<Button
					type="button"
					value={'Join Now!'}
					className={s.joinButton}
					func={(): void => setCurrentForm(Forms.Registration)}
				/>
			</form>
		</>
	);
};

export default SignIn;
