import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextInput from '../../../../components/inputs/TextInput';
import PasswordInput from '../../../../components/inputs/PasswordInput';
import Button from '../../../../components/buttons/Button';
import GoogleButton from '../../../../components/buttons/googleButton';

import s from './Forms.module.scss';
import { AuthForms, Field, Statuses } from '../../../../shared/constants';
import { useTranslation } from 'react-i18next';
import { AiOutlineMail } from 'react-icons/ai';
import { SignInSchema } from '../../../../shared/validation';
import { useUserStore } from '../../../user/store';
import { LoginSchemaType } from '../../../../services/endpoints/auth/schema';
import useToast from '../../../../shared/hooks/useToast.ts';
import { useNavigate } from 'react-router-dom';

interface ISignInProps {
	setCurrentForm: Dispatch<SetStateAction<AuthForms>>;
}

const SignIn: FC<ISignInProps> = ({ setCurrentForm }) => {
	const { login, error, status } = useUserStore();
	const navigate = useNavigate();
	const { notifyError } = useToast();
	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(SignInSchema),
	});

	useEffect(() => {
		switch (status) {
			case Statuses.LOADED:
				navigate('/user');
				break;
			case Statuses.ERROR:
				notifyError(error || 'error!');
		}
	}, [status]);

	const onSubmit: SubmitHandler<LoginSchemaType> = async (data): Promise<void> => {
		try {
			login(data);
		} catch (e) {
			notifyError(e);
		}
	};

	return (
		<>
			<h1 className={s.form__title}>{t('home.welcome')}</h1>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					register={register(Field.EMAIL)}
					name={Field.EMAIL}
					error={errors.email?.message}
					icon={<AiOutlineMail />}
				/>
				<PasswordInput register={register(Field.PASSWORD)} name={Field.PASSWORD} error={errors.password?.message} />
				<span className={s.forgotPassword} onClick={(): void => setCurrentForm(AuthForms.ForgotPassword)}>
					{t('home.forgotPassword')}
				</span>
				<Button
					type="submit"
					value={t('home.signIn')}
					className={s.button}
					disabled={Object.keys(errors).length > 0}
					loading={status === Statuses.LOADING}
				/>
				<GoogleButton />
				<div className={s.divider}>
					<span className={s.divider__text}>{t('general.or')}</span>
				</div>
				<Button
					type="button"
					value={t('home.joinNow')}
					className={s.joinButton}
					func={(): void => setCurrentForm(AuthForms.Registration)}
				/>
			</form>
		</>
	);
};

export default SignIn;
