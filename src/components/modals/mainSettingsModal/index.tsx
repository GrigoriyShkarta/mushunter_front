import { FC } from 'react';
import s from './style.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeMainSettingsSchemaType } from '../../../services/endpoints/user/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../inputs/TextInput.tsx';
import { Field } from '../../../shared/constants';
import { useUserStore } from '../../../pages/user/store';
import SelectInput from '../../inputs/Select.tsx';
import { useTranslation } from 'react-i18next';
import DatePickerInput from '../../inputs/DatePickerInput.tsx';
import Button from '../../buttons/Button.tsx';
import { ChangeMainSettingsValidationSchema } from '../../../shared/validation';
import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import { IoIosCloseCircle } from 'react-icons/io';
import { useModalStore } from '../store.ts';

const MainSettingsModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const user = useUserStore((state) => state.profile);
	const changeMainData = useUserStore((state) => state.changeMainData);
	const toggleSendForm = useUserStore((state) => state.toggleSendForm);
	const sendForm = useUserStore((state) => state.sendForm);
	const { setIsOpen } = useModalStore();

	console.log('main');

	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		control,
		watch,
	} = useForm<ChangeMainSettingsSchemaType>({
		resolver: zodResolver(ChangeMainSettingsValidationSchema),
		defaultValues: {
			[Field.BIRTHDAY]: user?.birthday,
			[Field.EDUCATION]: user?.education,
			[Field.NAME]: user?.firstname,
			[Field.LAST_NAME]: user?.lastname,
			[Field.PHONE]: user?.phone,
			[Field.LINKS]: user?.links,
		},
	});

	const formatedStyles = formatToOption(settings?.styles);
	const formatedCities = formatToOption(settings?.cities);
	const formatedUserStyles = formatToOption(user?.styles);
	const formatedUserCities = formatToOption(user?.city ? [user.city] : []);
	const linksArray = watch(Field.LINKS) ?? [];

	const onSubmit: SubmitHandler<ChangeMainSettingsSchemaType> = async (data): Promise<void> => {
		try {
			toggleSendForm();
			await changeMainData(data);
		} catch (e) {
			console.error('responseError', e);
		} finally {
			toggleSendForm();
			setIsOpen(false);
		}
	};

	const addField = (): void => {
		const currentLinks = getValues(Field.LINKS) || [];
		const updatedLinks = [...currentLinks, ''];
		setValue(Field.LINKS, updatedLinks);
	};

	const deleteLink = (index: number): void => {
		const currentLinks = getValues(Field.LINKS) || [];
		const updatedLinks = [...currentLinks];
		updatedLinks.splice(index, 1);
		setValue(Field.LINKS, updatedLinks);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.inputs}>
				<div className={s.nameWrapper}>
					<TextInput
						register={register(Field.NAME)}
						name={Field.NAME}
						error={errors.firstname?.message}
						className={s.input}
					/>
					<TextInput
						register={register(Field.LAST_NAME)}
						name={Field.LAST_NAME}
						error={errors.lastname?.message}
						className={s.input}
					/>
				</div>
				<SelectInput
					defaultValue={formatedUserStyles}
					options={formatedStyles}
					isMulti
					name={Field.STYLES}
					control={control}
				/>
				<SelectInput defaultValue={formatedUserCities} options={formatedCities} control={control} name={Field.CITY} />
				<DatePickerInput name={Field.BIRTHDAY} defaultValue={user?.birthday} control={control} />
				<TextInput register={register(Field.PHONE)} name={Field.PHONE} error={errors.phone?.message} />
				<TextInput register={register(Field.EDUCATION)} name={Field.EDUCATION} error={errors.education?.message} />
				<div className={s.linksWrapper}>
					{linksArray.map((_, idx) => (
						<div className={s.link} key={idx}>
							<TextInput register={register(`links.${idx}`)} name={Field.LINKS} />
							<IoIosCloseCircle size={'24px'} color={'red'} onClick={() => deleteLink(idx)} />
						</div>
					))}

					<Button type={'button'} value={t('user.addLink')} func={addField} className={s.addBtn} />
				</div>
			</div>
			<Button type={'submit'} value={t('general.send')} className={s.button} loading={sendForm} />
		</form>
	);
};

export default MainSettingsModal;
