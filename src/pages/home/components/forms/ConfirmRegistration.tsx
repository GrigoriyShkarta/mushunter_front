import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './Forms.module.scss';
import TextInput from '../../../../components/inputs/TextInput';
import Button from '../../../../components/buttons/Button';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux.ts';
import { registration } from '../../../../store/reducers/user/actionCreators.ts';
import { Statuses } from '../../../../shared/constants';

const ConfirmRegistration: FC = () => {
	const { status, error } = useAppSelector(state => state.userSlice);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<{ code: string, responseError: string }>();

	useEffect(() => {
		if (status === Statuses.ERROR) {
			setError('responseError', {
				type: 'custom',
				message: error,
			});
		}
	}, [status])

	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<{ code: string }> = (data): void => {
		const tempUserString = localStorage.getItem('temp_user');
		const tempToken = localStorage.getItem('temp_token');
		if (tempUserString && tempToken) {
			const tempUser = JSON.parse(tempUserString);
			dispatch(registration({
				...tempUser,
				tempToken,
				tempPassword: data.code
			}))
			localStorage.removeItem('temp_token');
			localStorage.removeItem('temp_user');
		}
	};

	return (
		<>
			<h1 className={s.form__title}>Enter code</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>Check email for a verification code.</p>
				<TextInput
					register={register('code', {
						required: 'field code must be required!',
					})}
					className={s.input}
					name={'code'}
					error={errors.code?.message}
				/>
				{errors.code?.message && (
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.code.message}</span>
					</div>
				)}
				<p className={s.form__text}>
					If you don't see a code in your inbox, check your spam folder. If it's not there, the
					email address may not be confirmed, or it may not match an existing MusHunter account.
				</p>
				{errors.responseError?.message && (
					<div className={s.errorResponseField}>
						<span className={s.errorText} style={{textAlign: 'center'}}>{errors.responseError.message}</span>
					</div>
				)}
				<Button
					type={'submit'}
					value={'Join'}
					className={s.button}
					disabled={Object.keys(errors).length > 0 && !errors.responseError}
				/>
			</form>
		</>
	);
};

export default ConfirmRegistration;
