import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../../pages/profile/store';
import { useModalStore } from '../store.ts';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Field, Languages } from '../../../shared/constants';

import { formatToOption } from '../../../shared/helpers/formatToOption.ts';
import { Option } from '../../../shared/models';
import SelectInput from '../../inputs/Select.tsx';
import TextInput from '../../inputs/TextInput.tsx';
import { IoIosCloseCircle } from 'react-icons/io';
import TextareaInput from '../../inputs/TextareaInput.tsx';
import Button from '../../buttons/Button.tsx';

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
	lookingForSkills: Skill[];
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
				user?.lookingForSkills.map((skill) => ({
					skill: {
						value: skill.id,
						label: skill.name[i18n.language as Languages],
					},
					experience: skill.experience,
					description: skill?.description,
				})) || [],
		},
	});

	const skillsArray = watch(Field.IN_SEARCH) || [];
	const formattedOptions = formatToOption(settings?.skills);

	const addSkillField = (): void => {
		const currentSkills = getValues(Field.IN_SEARCH) || [];
		const updatedSkills = [...currentSkills, { skill: { value: NaN, label: '' }, experience: 0 }];
		setValue(Field.IN_SEARCH, updatedSkills);
	};

	const updateSkill = (index: number, selectedSkill: Option): void => {
		const currentSkills = getValues(Field.IN_SEARCH);
		const updatedSkills = currentSkills.map((skillObj, idx) =>
			idx === index ? { ...skillObj, skill: selectedSkill } : skillObj,
		);
		setValue(Field.IN_SEARCH, updatedSkills, { shouldValidate: true, shouldDirty: true });
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
			}));
		await changeInSearch({ [Field.SKILLS]: formattedData });
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
									register={register(`${Field.IN_SEARCH}.${index}.experience`)}
									name={Field.EXPERIENCE}
									type={'number'}
								/>
							</div>
							<div className={s.svgBlock}>
								<IoIosCloseCircle size={'24px'} color={'red'} onClick={() => deleteSkill(index)} />
							</div>
						</div>
						<TextareaInput register={register(`${Field.IN_SEARCH}.${index}.description`)} name={Field.DESCRIPTION} />
					</div>
				))}
				<Button type={'button'} value={t('user.addSkill')} func={addSkillField} className={s.addBtn} />
			</div>
			<Button type={'submit'} value={t('general.send')} className={s.sendBtn} loading={sendForm} />
		</form>
	);
};

export default InSearchModal;
