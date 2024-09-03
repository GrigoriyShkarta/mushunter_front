import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from '../Forms.module.scss';
import PasswordInput from '../../../../../components/inputs/PasswordInput';
import Button from '../../../../../components/buttons/Button';
// import api from '../../../../../services/api';
import { Field } from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';

interface DataForm {
	[Field.NEW_PASSWORD]: string;
	[Field.CHECK_PASSWORD]: string;
	responseError?: string;
}

const ChangePasswordStage: FC = () => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<DataForm>();

	const onSubmit: SubmitHandler<{ newPassword: string; checkPassword: string }> = async (data): Promise<void> => {
		if (data.newPassword !== data.checkPassword) {
			setError('checkPassword', {
				type: 'custom',
				message: t('validation.beMatch'),
			});
		} else {
			const tempToken = localStorage.getItem('temp_token');

			if (tempToken) {
				try {
					// await api.auth.changePassword({
					// 	tempToken,
					// 	newPassword: data.newPassword,
					// });
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
			<h1 className={s.form__title}>{t('home.chooseNewPassword')}</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>{t('home.secureAccount')}</p>
				<PasswordInput
					register={register(Field.NEW_PASSWORD)}
					className={s.input}
					name={Field.NEW_PASSWORD}
					error={errors.newPassword?.message}
				/>
				<PasswordInput
					register={register('checkPassword', {
						required: t('validation.Required'),
					})}
					className={s.input}
					name={Field.CHECK_PASSWORD}
					error={errors.checkPassword?.message}
					placeholder={t('home.retypeNewPassword')}
				/>
				{errors.responseError && (
					<div className={s.errorField}>
						<span className={s.errorText}>{errors.responseError.message}</span>
					</div>
				)}
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

export default ChangePasswordStage;
