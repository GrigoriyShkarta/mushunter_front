import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IoIosCloseCircle } from 'react-icons/io';
import { useUserStore } from '../../../pages/profile/store';
import { Field } from '../../../shared/constants';
import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import { ChangeMainSettingsBandValidationSchema, ChangeMainSettingsValidationSchema } from '../../../shared/validation';
import Button from '../../buttons/Button.tsx';
import DatePickerInput from '../../inputs/DatePickerInput.tsx';
import SelectInput from '../../inputs/Select.tsx';
import TextInput from '../../inputs/TextInput.tsx';
import { useModalStore } from '../store.ts';
import s from './style.module.scss';

const MainSettingsModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const pageData = useUserStore((state) => state.pageData);
	const sendForm = useUserStore((state) => state.sendForm);
	const { changeMainData, changeMainBandData } = useUserStore((state) => state);
	const { setIsOpen } = useModalStore();
	const isUser = pageData ? Field.FIRST_NAME in pageData : false;

	const { t } = useTranslation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
		control,
		watch,
	} = useForm({
		resolver: zodResolver(isUser ? ChangeMainSettingsValidationSchema : ChangeMainSettingsBandValidationSchema),
		defaultValues: {
			[Field.BIRTHDAY]: pageData?.birthday,
			[Field.EDUCATION]: pageData?.education,
			[Field.FIRST_NAME]: pageData?.firstname,
			[Field.LAST_NAME]: pageData?.lastname,
			[Field.NAME]: pageData?.name,
			[Field.PHONE]: pageData?.phone,
			[Field.LINKS]: pageData?.links,
			[Field.STYLES]: formatToOption(pageData?.styles),
			[Field.CITY]: formatToOption(pageData?.city ? [pageData.city] : []),
		},
	});

	const formatedStyles = formatToOption(settings?.styles);
	const formatedCities = formatToOption(settings?.cities);
	const linksArray = watch(Field.LINKS) ?? [];

	const onSubmit = async (data: any): Promise<void> => {
		console.log('data', data);
		try {
			if (isUser) {
				await changeMainData(data);
			} else {
				const dataToSend = {
					...data,
					id: pageData?.id,
				};
				await changeMainBandData(dataToSend);
			}
		} catch (e) {
			console.error('responseError', e);
		} finally {
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
				{isUser ? (
					<div className={s.nameWrapper}>
						<TextInput
							register={register(Field.FIRST_NAME)}
							name={Field.FIRST_NAME}
							error={errors.firstname?.message}
							className={s.input}
						/>
						<TextInput
							register={register(Field.LAST_NAME)}
							name={Field.LAST_NAME}
							error={errors?.name?.message}
							className={s.input}
						/>
					</div>
				) : (
					<TextInput
						register={register(Field.NAME)}
						name={Field.NAME}
						error={errors.name?.message}
						className={s.input}
					/>
				)}

				<SelectInput options={formatedStyles} isMulti name={Field.STYLES} control={control} />
				<SelectInput options={formatedCities} control={control} name={Field.CITY} />
				<DatePickerInput name={Field.BIRTHDAY} control={control} label={!isUser ? t('user.foundingData') : ''} />
				{isUser && (
					<>
						<TextInput register={register(Field.PHONE)} name={Field.PHONE} error={errors.phone?.message} />
						<TextInput register={register(Field.EDUCATION)} name={Field.EDUCATION} error={errors.education?.message} />
					</>
				)}

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
