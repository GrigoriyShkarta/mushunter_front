import { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../../../../components/buttons/Button';
import TextInput from '../../../../../components/inputs/TextInput';
import s from '../Forms.module.scss';
// import api from '../../../../../services/api';
import { Field, ForgotPasswordStage } from '../../../../../shared/constants';
import { useTranslation } from 'react-i18next';

const CodeStage: FC<{ setStage: Dispatch<SetStateAction<ForgotPasswordStage>> }> = ({ setStage }) => {
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<{ code: string; responseError: string }>();

	const onSubmit: SubmitHandler<{ code: string }> = async (data): Promise<void> => {
		const email = localStorage.getItem('email');
		const tempToken = localStorage.getItem('temp_token');

		if (email && tempToken) {
			// const res = await api.auth.checkTempPassword({
			// 	email: email,
			// 	tempPassword: data.code,
			// 	tempToken,
			// });
			// if (res.data) {
			// 	localStorage.removeItem('email');
			// 	setStage(ForgotPasswordStage.NEW_PASSWORD);
			// } else {
			// 	return setError('responseError', {
			// 		type: 'custom',
			// 		message: 'something went wrong, please refresh the page or try again later',
			// 	});
			// }
		} else {
			return setError('responseError', {
				type: 'custom',
				message: 'something went wrong, please refresh the page or try again later',
			});
		}
	};

	return (
		<>
			<h1 className={s.form__title}>{t('home.enterCode')}</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<p className={s.form__text}>
					{t('home.checkEmail')}
					<span className={s.form__span} onClick={(): void => setStage(ForgotPasswordStage.EMAIL)}>
						{t('general.changeEmail')}
					</span>
				</p>
				<TextInput
					register={register(Field.CODE, { required: t('validation.Required') })}
					className={s.input}
					name={Field.CODE}
					error={errors[Field.CODE]?.message}
				/>
				<p className={s.form__text}>{t('home.checkSpam')}</p>
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

export default CodeStage;
