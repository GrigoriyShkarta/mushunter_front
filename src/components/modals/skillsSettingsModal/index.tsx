import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../../pages/user/store';
import { useForm } from 'react-hook-form';
import { ChangeSkillsSchema, GetChangeSkillsSchemaType } from '../../../services/endpoints/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field } from '../../../shared/constants';

const SkillsSettingsModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const user = useUserStore((state) => state.user);

	const { register, handleSubmit, getValues, setValue, control, watch } = useForm<GetChangeSkillsSchemaType>({
		resolver: zodResolver(ChangeSkillsSchema),
		defaultValues: {
			// [Field.SKILLS]: user?.skills || [],
		},
	});

	return <form className={s.form} onSubmit={handleSubmit(onSubmit)}></form>;
};

export default SkillsSettingsModal;
