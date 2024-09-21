import { FC, useState } from 'react';
import s from './style.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeMainSettingsSchemaType } from '../../../services/endpoints/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../inputs/TextInput.tsx';
import { Field } from '../../../shared/constants';
import { useUserStore } from '../../../pages/user/store';
import SelectInput from '../../inputs/Select.tsx';
import { MultiValue, SingleValue } from 'react-select';
import { Option } from '../../../shared/models';
import { useTranslation } from 'react-i18next';
import DatePickerInput from '../../inputs/DatePickerInput.tsx';
import Button from '../../buttons/Button.tsx';
import { ChangeMainSettingsValidationSchema } from '../../../shared/validation';

const MainSettingsModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const user = useUserStore((state) => state.user);
	const [linksCount, setLinksCount] = useState(1);
	const { i18n, t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ChangeMainSettingsSchemaType>({
		resolver: zodResolver(ChangeMainSettingsValidationSchema),
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

	const onSubmit: SubmitHandler<ChangeMainSettingsSchemaType> = async (data): Promise<void> => {
		console.log('data', data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
				<DatePickerInput name={Field.BIRTHDAY} defaultValue={user?.birthday} control={control} />
				<TextInput register={register(Field.PHONE)} name={Field.PHONE} error={errors.phone?.message} />
				<TextInput register={register(Field.EDUCATION)} name={Field.EDUCATION} error={errors.education?.message} />
				<div className={s.linksWrapper}>
					{Array.from({ length: linksCount }, (_, index) => (
						<TextInput key={index} register={register(Field.LINKS)} name={Field.LINKS} value={user?.links[index]} />
					))}
					<Button type={'button'} value={'add'} className={''} func={() => setLinksCount(linksCount + 1)} />
				</div>
			</div>
			<Button type={'submit'} value={t('general.send')} className={''} />
		</form>
	);
};

export default MainSettingsModal;
