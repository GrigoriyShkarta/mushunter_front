import { FC } from 'react';
import s from './style.module.scss';
import { useForm } from 'react-hook-form';
import { ChangeMainSettingsSchema, ChangeMainSettingsSchemaType } from '../../../services/endpoints/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../inputs/TextInput.tsx';
import { Field } from '../../../shared/constants';

const MainSettingsModal: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangeMainSettingsSchemaType>({
		resolver: zodResolver(ChangeMainSettingsSchema),
	});

	return (
		<form>
			<div className={s.inputs}>
				<div className={s.nameWrapper}>
					<TextInput register={register(Field.NAME)} name={Field.NAME} error={errors.firstname?.message} />
					<TextInput register={register(Field.LAST_NAME)} name={Field.LAST_NAME} error={errors.lastname?.message} />
				</div>
			</div>
		</form>
	);
};

export default MainSettingsModal;
