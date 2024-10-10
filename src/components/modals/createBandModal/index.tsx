import { FC, useState } from 'react';
import s from './style.module.scss';
import { Field } from '../../../shared/constants';
import TextInput from '../../inputs/TextInput.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateGroupValidateSchema } from '../../../shared/validation';
import { CreateGroupDtoType } from '../../../services/endpoints/group/schema';
import SelectInput from '../../inputs/Select.tsx';
import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import { useUserStore } from '../../../pages/profile/store';
import DatePickerInput from '../../inputs/DatePickerInput.tsx';
import Avatar from 'react-avatar-edit';
import { useTranslation } from 'react-i18next';
import { IoIosCloseCircle } from 'react-icons/io';
import Button from '../../buttons/Button.tsx';
import TextareaInput from '../../inputs/TextareaInput.tsx';
import { create } from '../../../services/endpoints/group';

const CreateBandModal: FC = () => {
	const settings = useUserStore((state) => state.settings);
	const sendForm = useUserStore((state) => state.sendForm);

	const [croppedImage, setCroppedImage] = useState<string | null>(null);

	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
		getValues,
		setValue,
	} = useForm<CreateGroupDtoType>({
		resolver: zodResolver(CreateGroupValidateSchema),
	});

	const onCrop = (preview: string) => {
		setCroppedImage(preview);
	};

	const onClose = () => {
		setCroppedImage(null);
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

	const base64ToBlob = (base64: string): Blob => {
		const byteString = atob(base64.split(',')[1]);
		const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ab], { type: mimeString });
	};

	const formatedCities = formatToOption(settings?.cities);
	const linksArray = watch(Field.LINKS) ?? [];
	const formatedStyles = formatToOption(settings?.styles);

	const onSubmit: SubmitHandler<CreateGroupDtoType> = async (data): Promise<void> => {
		try {
			const formData = new FormData();

			formData.append(Field.NAME, data.name);
			if (data.city) formData.append(Field.CITY, data.city.toString());
			if (data.description) formData.append(Field.DESCRIPTION, data.description);
			if (data.styles) formData.append(Field.STYLES, JSON.stringify(data.styles));
			if (data.created_date) formData.append(Field.CREATION_DATE, JSON.stringify(data.created_date));
			if (data.links) formData.append(Field.LINKS, JSON.stringify(data.links));

			if (croppedImage) {
				const blob = base64ToBlob(croppedImage);
				const randomNumber = Math.floor(Math.random() * 1000000);
				formData.append('file', blob, `avatar_id${data.name}_${randomNumber}.png`);
			}

			await create(formData);
		} catch (e) {
			console.error('responseError', e);
		}
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={s.inputs}>
				<div className={s.top}>
					<div className={s.leftSide}>
						<TextInput
							register={register(Field.NAME)}
							name={Field.NAME}
							error={errors.name?.message}
							className={s.input}
						/>
						<SelectInput options={formatedCities} control={control} name={Field.CITY} />
						<DatePickerInput name={Field.CREATION_DATE} control={control} />
					</div>
					<div className={s.rightSide}>
						<Avatar width={200} height={200} label={t('user.createBandPhoto')} onCrop={onCrop} onClose={onClose} />
					</div>
				</div>

				<SelectInput options={formatedStyles} isMulti name={Field.STYLES} control={control} />

				<div className={s.linksWrapper}>
					{linksArray.map((_, idx) => (
						<div className={s.link} key={idx}>
							<TextInput register={register(`links.${idx}`)} name={Field.LINKS} />
							<IoIosCloseCircle size={'24px'} color={'red'} onClick={() => deleteLink(idx)} />
						</div>
					))}

					<Button type={'button'} value={t('user.addLink')} func={addField} className={s.addBtn} />
				</div>

				<TextareaInput register={register(Field.DESCRIPTION)} name={Field.DESCRIPTION} />
			</div>

			<Button type={'submit'} value={t('general.send')} className={s.button} loading={sendForm} />
		</form>
	);
};

export default CreateBandModal;
