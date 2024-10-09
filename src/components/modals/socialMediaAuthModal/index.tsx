import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import s from './style.module.scss';
import TextInput from '../../inputs/TextInput.tsx';
import { Field } from '../../../shared/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { FinishRegisterSchema } from '../../../shared/validation';
import { FinishedRegistrationSchemaType } from '../../../services/endpoints/auth/schema';
import Button from '../../buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../../pages/profile/store';
import { useNavigate } from 'react-router-dom';

const SocialMediaAuthModal: FC = () => {
	const { t } = useTranslation();
	const { registrationUser } = useUserStore();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FinishedRegistrationSchemaType>({
		resolver: zodResolver(FinishRegisterSchema),
	});

	const onSubmit: SubmitHandler<FinishedRegistrationSchemaType> = async (data): Promise<void> => {
		const email = localStorage.getItem('emailForRegistration');
		if (email) {
			setLoading(true);
			try {
				registrationUser({
					[Field.FIRST_NAME]: data.firstname,
					[Field.LAST_NAME]: data.lastname,
					[Field.EMAIL]: email,
				});
				navigate('/user');
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.inputs}>
				<TextInput register={register(Field.FIRST_NAME)} name={Field.FIRST_NAME} error={errors.firstname?.message} />
				<TextInput register={register(Field.LAST_NAME)} name={Field.LAST_NAME} error={errors.lastname?.message} />
			</div>
			<Button type={'submit'} value={t('general.send')} className={s.button} loading={loading} />
		</form>
	);
};

export default SocialMediaAuthModal;
