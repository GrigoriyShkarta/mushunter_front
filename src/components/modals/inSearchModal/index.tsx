import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../../pages/profile/store';
import { useModalStore } from '../store.ts';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Field, Languages } from '../../../shared/constants';

import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import SelectInput from '../../inputs/Select.tsx';
import TextInput from '../../inputs/TextInput.tsx';
import { IoIosCloseCircle } from 'react-icons/io';
import TextareaInput from '../../inputs/TextareaInput.tsx';
import Button from '../../buttons/Button.tsx';
import CheckboxInput from '../../inputs/CheckboxInput.tsx';

interface SkillOption {
	value: number;
	label: string;
}

interface Skill {
	skill: SkillOption;
	experience: number;
	description?: string;
	styles: SkillOption[];
	age: SkillOption;
}

interface UserSkills {
	lookingForSkills: Skill[];
	isLookingForBand: boolean;
	stylesLookingForBand?: SkillOption[];
	position?: SkillOption;
	descriptionPosition?: string;
}

const InSearchModal: FC = () => {
	const { settings, user, changeInSearch, sendForm } = useUserStore((state) => ({
		settings: state.settings,
		user: state.profile,
		changeInSearch: state.changeInSearch,
		sendForm: state.sendForm,
	}));
	const { setIsOpen } = useModalStore();
	const { i18n, t } = useTranslation();

	const { register, handleSubmit, getValues, setValue, control, watch } = useForm<UserSkills>({
		defaultValues: {
			[Field.IN_SEARCH]:
				user?.lookingForSkills?.map((skill) => ({
					skill: {
						value: skill.id,
						label: skill.name[i18n.language as Languages],
					},
					experience: skill.experience,
					description: skill?.description,
					styles: skill?.styles.map((style) => ({
						value: style.id,
						label: style.name,
					})),
					age: { value: skill.age?.id, label: skill.age?.name },
				})) || [],
			[Field.SEARCH_BAND]: user?.isLookingForBand,
			[Field.POSITION]: user?.position
				? {
						value: user.position?.id,
						label: user.position?.name[i18n.language as Languages],
					}
				: undefined,
			[Field.DESCRIPTION_POSITION]: user?.descriptionPosition,
			[Field.STYLES_SEARCH_BAND]:
				user?.stylesLookingForBand?.map((style) => ({
					value: style.id,
					label: style.name,
				})) ?? [],
		},
	});

	const skillsArray = watch(Field.IN_SEARCH) || [];
	const isCheckedSearchBand = watch(Field.SEARCH_BAND);
	const formattedOptionsSkills = formatToOption(settings?.skills);
	const formattedOptionsStyles = formatToOption(settings?.styles);
	const formattedUserSkill = formatToOption(user?.skills);
	const formatedStyles = formatToOption(settings?.styles);
	const formatedAge = formatToOption(settings?.age);

	const addSkillField = (): void => {
		const currentSkills = getValues(Field.IN_SEARCH) || [];
		const updatedSkills = [
			...currentSkills,
			{ skill: { value: NaN, label: '' }, experience: 0, styles: [], age: { value: NaN, label: '' } },
		];
		setValue(Field.IN_SEARCH, updatedSkills);
	};

	const deleteSkill = (index: number): void => {
		const currentSkills = getValues(Field.IN_SEARCH) || [];
		const updatedSkills = [...currentSkills];
		updatedSkills.splice(index, 1);
		setValue(Field.IN_SEARCH, updatedSkills);
	};

	const handleSubmitForm = async (data: UserSkills): Promise<void> => {
		const formattedData = data.lookingForSkills
			.filter((obj) => !isNaN(obj.skill.value))
			.map((skillObj) => ({
				skill: skillObj.skill.value,
				experience: Number(skillObj.experience),
				description: skillObj?.description,
				styles: skillObj.styles.map((style) => style.value),
				age: skillObj.age.value,
			}));

		await changeInSearch({
			[Field.SKILLS]: formattedData,
			[Field.SEARCH_BAND]: data.isLookingForBand,
			[Field.POSITION]: data.position?.value,
			[Field.STYLES_SEARCH_BAND]: data.stylesLookingForBand?.map((style) => style.value) ?? [],
			[Field.DESCRIPTION_POSITION]: data.descriptionPosition,
		});
		setIsOpen(false);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(handleSubmitForm)}>
			<div className={s.inputs}>
				<CheckboxInput
					register={register(Field.SEARCH_BAND)}
					name={Field.SEARCH_BAND}
					checked={isCheckedSearchBand}
					onChange={(e) => setValue(Field.SEARCH_BAND, e.target.checked)}
				/>
				{isCheckedSearchBand && (
					<>
						<SelectInput name={Field.POSITION} control={control} options={formattedUserSkill} />
						<SelectInput
							name={Field.STYLES_SEARCH_BAND}
							control={control}
							options={formattedOptionsStyles}
							placeholder={'styles'}
							label={'styles'}
							isMulti
						/>
						<TextareaInput
							register={register(Field.DESCRIPTION_POSITION)}
							name={Field.DESCRIPTION_POSITION}
							label={'aboutYourself'}
							placeholder={'description'}
						/>
					</>
				)}
				{skillsArray.map((skillObj, index) => (
					<div key={index} className={s.inputWrapper}>
						<div className={s.block}>
							<div className={s.bigInput}>
								<SelectInput
									name={`${Field.IN_SEARCH}.${index}.skill`}
									control={control}
									defaultValue={[skillObj.skill]}
									options={formattedOptionsSkills}
									label={'skills'}
									placeholder={'skill'}
								/>
							</div>
							<div className={s.smallInput}>
								<TextInput
									register={register(`${Field.IN_SEARCH}.${index}.experience`)}
									name={Field.EXPERIENCE}
									type={'number'}
								/>
							</div>
							<div className={s.svgBlock}>
								<IoIosCloseCircle size={'24px'} color={'red'} onClick={() => deleteSkill(index)} />
							</div>
						</div>
						<SelectInput
							options={formatedAge}
							name={`${Field.IN_SEARCH}.${index}.age`}
							control={control}
							defaultValue={skillObj.age}
							label={'age'}
							placeholder={'age'}
						/>
						<SelectInput
							defaultValue={skillObj.styles}
							options={formatedStyles}
							isMulti
							name={`${Field.IN_SEARCH}.${index}.styles`}
							placeholder={'styles'}
							label={'styles'}
							control={control}
						/>
						<TextareaInput register={register(`${Field.IN_SEARCH}.${index}.description`)} name={Field.DESCRIPTION} />
					</div>
				))}
				<Button type={'button'} value={t('user.addPosition')} func={addSkillField} className={s.addBtn} />
			</div>
			<Button type={'submit'} value={t('general.send')} className={s.sendBtn} loading={sendForm} />
		</form>
	);
};

export default InSearchModal;
