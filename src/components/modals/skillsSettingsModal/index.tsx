import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../../pages/profile/store';
import { useForm } from 'react-hook-form';
import { Field, Languages } from '../../../shared/constants';
import { useTranslation } from 'react-i18next';
import SelectInput from '../../inputs/Select.tsx';
import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import TextInput from '../../inputs/TextInput.tsx';
import Button from '../../buttons/Button.tsx';
import { Option } from '../../../shared/models';
import { useModalStore } from '../store.ts';
import { IoIosCloseCircle } from 'react-icons/io';
import TextareaInput from '../../inputs/TextareaInput.tsx';

interface SkillOption {
	value: number;
	label: string;
}

interface Skill {
	skill: SkillOption;
	experience: number;
	description?: string;
}

interface UserSkills {
	skills: Skill[];
}

const SkillsSettingsModal: FC = () => {
	const { settings, user, changeSkills, sendForm } = useUserStore((state) => ({
		settings: state.settings,
		user: state.profile,
		changeSkills: state.changeSkills,
		sendForm: state.sendForm,
	}));
	const { setIsOpen } = useModalStore();
	const { i18n, t } = useTranslation();

	const { register, handleSubmit, getValues, setValue, control, watch } = useForm<UserSkills>({
		defaultValues: {
			[Field.SKILLS]:
				user?.skills.map((skill) => ({
					skill: {
						value: skill.id,
						label: skill.name[i18n.language as Languages],
					},
					experience: skill.experience,
					description: skill?.description,
				})) || [],
		},
	});

	const skillsArray = watch(Field.SKILLS) || [];
	const formattedOptions = formatToOption(settings?.skills);

	const addSkillField = (): void => {
		const currentSkills = getValues(Field.SKILLS) || [];
		const updatedSkills = [...currentSkills, { skill: { value: NaN, label: '' }, experience: 0 }];
		setValue(Field.SKILLS, updatedSkills);
	};

	const updateSkill = (index: number, selectedSkill: Option): void => {
		const currentSkills = getValues(Field.SKILLS);
		const updatedSkills = currentSkills.map((skillObj, idx) =>
			idx === index ? { ...skillObj, skill: selectedSkill } : skillObj,
		);
		setValue(Field.SKILLS, updatedSkills, { shouldValidate: true, shouldDirty: true });
	};

	const deleteSkill = (index: number): void => {
		const currentSkills = getValues(Field.SKILLS) || [];
		const updatedSkills = [...currentSkills];
		updatedSkills.splice(index, 1);
		setValue(Field.SKILLS, updatedSkills);
	};

	const handleSubmitForm = async (data: UserSkills): Promise<void> => {
		const formattedData = data.skills
			.filter((obj) => !isNaN(obj.skill.value))
			.map((skillObj) => ({
				skill: skillObj.skill.value,
				experience: Number(skillObj.experience),
				description: skillObj?.description,
			}));
		await changeSkills({ [Field.SKILLS]: formattedData });
		setIsOpen(false);
	};

	return (
		<form className={s.form} onSubmit={handleSubmit(handleSubmitForm)}>
			<div className={s.inputs}>
				{skillsArray.map((skillObj, index) => (
					<div key={index} className={s.inputWrapper}>
						<div className={s.block}>
							<div className={s.bigInput}>
								<SelectInput
									name={Field.SKILLS}
									control={control}
									objPath={'skill'}
									idxPath={index}
									defaultValue={[skillObj.skill]}
									options={formattedOptions}
									handleChange={(selectedSkill) => updateSkill(index, selectedSkill as Option)}
								/>
							</div>
							<div className={s.smallInput}>
								<TextInput
									register={register(`${Field.SKILLS}.${index}.experience`)}
									name={Field.EXPERIENCE}
									type={'number'}
								/>
							</div>
							<div className={s.svgBlock}>
								<IoIosCloseCircle size={'24px'} color={'red'} onClick={() => deleteSkill(index)} />
							</div>
						</div>
						<TextareaInput register={register(`${Field.SKILLS}.${index}.description`)} name={Field.DESCRIPTION} />
					</div>
				))}
				<Button type={'button'} value={t('user.addSkill')} func={addSkillField} className={s.addBtn} />
			</div>
			<Button type={'submit'} value={t('general.send')} className={s.sendBtn} loading={sendForm} />
		</form>
	);
};

export default SkillsSettingsModal;
