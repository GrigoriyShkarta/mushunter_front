import { FC } from 'react';
import s from './style.module.scss';
import { useForm } from 'react-hook-form';
import { ChangeMainSettingsSchema, ChangeMainSettingsSchemaType } from '../../../services/endpoints/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../inputs/TextInput.tsx';
import { Field } from '../../../shared/constants';
import { useUserStore } from '../../../pages/user/store';
import SelectInput from '../../inputs/Select.tsx';
import { MultiValue, SingleValue } from 'react-select';
import { Option } from '../../../shared/models';
import { useTranslation } from 'react-i18next';

const MainSettingsModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const user = useUserStore((state) => state.user);
	const { i18n } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangeMainSettingsSchemaType>({
		resolver: zodResolver(ChangeMainSettingsSchema),
	});

	const formatToOption = (
		array?: { id: number; name: string | { ua: string; en: string } }[],
	): Option[] | undefined => {
		return array?.map((item) => {
			if (typeof item.name === 'string') {
				return {
					value: item.id,
					label: item.name,
				};
			} else {
				return {
					value: item.id,
					label: item.name[i18n.language as 'ua' | 'en'] || item.name.en,
				};
			}
		});
	};

	const formatedStyles = formatToOption(settings?.styles);
	const formatedCities = formatToOption(settings?.cities);
	const formatedUserStyles = formatToOption(user?.styles);
	const formatedUserCities = formatToOption(user?.city ? [user.city] : []);

	const handleChangeStyle = (styleObj: MultiValue<Option> | SingleValue<Option>): void => {
		console.log(styleObj);
	};

	return (
		<form>
			<div className={s.inputs}>
				<div className={s.nameWrapper}>
					<TextInput
						register={register(Field.NAME)}
						name={Field.NAME}
						error={errors.firstname?.message}
						value={user?.firstname}
					/>
					<TextInput
						register={register(Field.LAST_NAME)}
						name={Field.LAST_NAME}
						error={errors.lastname?.message}
						value={user?.lastname}
					/>
				</div>
				<SelectInput
					register={register(Field.STYLES)}
					defaultValue={formatedUserStyles}
					options={formatedStyles}
					onChange={handleChangeStyle}
					isMulti
					name={Field.STYLES}
				/>
				<SelectInput
					register={register(Field.CITY)}
					defaultValue={formatedUserCities}
					options={formatedCities}
					onChange={handleChangeStyle}
					name={Field.CITY}
				/>
				<TextInput register={register(Field.PHONE)} name={Field.PHONE} error={errors.phone?.message} />
				<TextInput register={register(Field.EDUCATION)} name={Field.EDUCATION} error={errors.education?.message} />
			</div>
		</form>
	);
};

export default MainSettingsModal;
