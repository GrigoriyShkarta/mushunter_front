import { FC } from 'react';
import s from './style.module.scss';
import Button from '../../buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeDescriptionSchema } from '../../../shared/validation';
import { Field } from '../../../shared/constants';
import { useUserStore } from '../../../pages/profile/store';
import TextareaInput from '../../inputs/TextareaInput.tsx';
import { ChangeDescriptionSchemaType } from '../../../services/endpoints/user/schema';
import { useModalStore } from '../store.ts';

const DescriptionSettingsModule: FC = () => {
	const user = useUserStore((state) => state.profile);
	const changeDescription = useUserStore((state) => state.changeDescription);
	const sendForm = useUserStore((state) => state.sendForm);
	const { setIsOpen } = useModalStore();
	const { t } = useTranslation();
	const { register, handleSubmit } = useForm<ChangeDescriptionSchemaType>({
		resolver: zodResolver(ChangeDescriptionSchema),
		defaultValues: {
			[Field.DESCRIPTION]: user?.description,
		},
	});

	const onSubmit: SubmitHandler<ChangeDescriptionSchemaType> = async (data): Promise<void> => {
		try {
			await changeDescription(data);
		} catch (e) {
			console.error('responseError', e);
		} finally {
			setIsOpen(false);
		}
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<TextareaInput register={register(Field.DESCRIPTION)} name={Field.DESCRIPTION} />
			<Button type={'submit'} value={t('general.send')} className={s.button} loading={sendForm} />
		</form>
	);
};

export default DescriptionSettingsModule;
