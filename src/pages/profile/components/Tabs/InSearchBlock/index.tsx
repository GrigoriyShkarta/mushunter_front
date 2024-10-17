import { FC } from 'react';
import { useUserStore } from '../../../store';
import s from './style.module.scss';
import { Languages, UserModal } from '../../../../../shared/constants';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Button from '../../../../../components/buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from '../../../../../shared/helpers/capitalizeFirstLetter.ts';
import { getAgeWord } from '../../../../../shared/helpers/getYears.ts';

interface DetailObj {
	id: number;
	name: {
		ua: string;
		en: string;
	};
}

interface Skill {
	id: number;
	name: {
		ua: string;
		en: string;
	};
	experience: number;
	description?: string;
	styles?: { id: number; name: string }[];
	age?: { id: number; name: string };
}

interface Props {
	id: number;
	openModal: (name: UserModal) => void;
	searchArray?: Skill[];
	isLookingForBand?: boolean;
	position?: DetailObj;
	stylesLookingForBand?: { id: number; name: string }[];
	descriptionPosition?: string;
}

const InSearchBlock: FC<Props> = ({
	id,
	openModal,
	searchArray,
	isLookingForBand,
	position,
	stylesLookingForBand,
	descriptionPosition,
}) => {
	const profile = useUserStore((state) => state.profile);
	const { t, i18n } = useTranslation();

	if (profile?.id === id && searchArray?.length === 0 && !isLookingForBand) {
		return (
			<section className={s.section}>
				<Button
					type="button"
					value={t('user.addSection')}
					className={s.addSection}
					func={() => openModal(UserModal.SearchSettings)}
				/>
			</section>
		);
	}

	return (
		<section className={s.section}>
			<div className={s.wrapper}>
				{profile?.id === id && (
					<div className={s.edit} onClick={() => openModal(UserModal.SearchSettings)}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
			</div>
			<div className={s.skills}>
				{isLookingForBand && (
					<div className={s.skill}>
						<div className={s.skill__top}>
							<div className={s.main}>
								<p className={s.skill__name}>
									{capitalizeFirstLetter(t('general.isLookingForBand'))}
									{' ' + t('user.as') + ' '}
									{capitalizeFirstLetter(position?.name[i18n.language as Languages] ?? '')}
								</p>
							</div>
							<div className={s.skill__styles}>
								{stylesLookingForBand?.map((style) => (
									<div key={style.id} className={s.skill__styles_style}>
										{style.name}
									</div>
								))}
							</div>
						</div>

						<p>{descriptionPosition}</p>
					</div>
				)}
				{searchArray?.map((skill) => (
					<div className={s.skill} key={skill.id}>
						<div className={s.skill__top}>
							<div className={s.main}>
								<p className={s.skill__name}>
									{capitalizeFirstLetter(t('general.lookingForSkills') + ' ')}
									{capitalizeFirstLetter(skill.name[i18n.language as Languages])}
									{i18n.language === Languages.UK && 'a'}
								</p>
								<p className={s.progress_years}>
									{skill.experience > 10
										? `(${t('user.more10Years')})`
										: `(${getAgeWord(skill.experience, i18n.language as Languages)})`}
								</p>
							</div>
							<div className={s.skill__styles}>
								{skill?.styles?.map((style) => (
									<div key={style.id} className={s.skill__styles_style}>
										{style.name}
									</div>
								))}
							</div>
							<div className={s.skill__age}>
								{skill.age?.name} {t('general.years')}
							</div>
						</div>

						<p>{skill.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default InSearchBlock;
