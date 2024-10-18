import { FC } from 'react';
import s from './style.module.scss';
import { capitalizeFirstLetter } from '../../shared/helpers/capitalizeFirstLetter.ts';
import { Languages } from '../../shared/constants';
import { getAgeWord } from '../../shared/helpers/getYears.ts';
import { useTranslation } from 'react-i18next';

interface Props {
	name?: { ua: string; en: string };
	experience?: number;
	styles?: { id: number; name: string }[];
	age?: string;
	description?: string;
	isLookingForBand?: boolean;
	isSkill?: boolean;
}

const SkillContainer: FC<Props> = ({ age, experience, name, styles, description, isLookingForBand, isSkill }) => {
	const { t, i18n } = useTranslation();
	console.log('experience', experience);

	const NameSkill = (): string | JSX.Element | undefined => {
		if (isSkill) {
			return name && capitalizeFirstLetter(name[i18n.language as Languages]);
		}

		if (isLookingForBand) {
			return (
				<>
					{capitalizeFirstLetter(t('general.isLookingForBand')) + ' '}
					{t('user.as') + ' '}
					{capitalizeFirstLetter(name ? name[i18n.language as Languages] : '')}
				</>
			);
		} else {
			return (
				<>
					{capitalizeFirstLetter(t('general.lookingForSkills')) + ' '}
					{capitalizeFirstLetter(name ? name[i18n.language as Languages] : '')}
					{i18n.language === Languages.UK && 'a'}
				</>
			);
		}
	};

	return (
		<div className={s.skill}>
			<div className={s.skill__top}>
				<div className={s.main}>
					<p className={s.skill__name}>
						<NameSkill />
					</p>

					{experience && (
						<p className={s.progress_years}>
							{experience > 10
								? `(${t('user.more10Years')})`
								: `(${getAgeWord(experience, i18n.language as Languages)})`}
						</p>
					)}
				</div>
				<div className={s.skill__styles}>
					{styles?.map((style) => (
						<div key={style.id} className={s.skill__styles_style}>
							{style.name}
						</div>
					))}
				</div>
				{age && (
					<div className={s.skill__age}>
						{age} {t('general.years')}
					</div>
				)}
			</div>

			<p className={s.skill__description}>{description}</p>
		</div>
	);
};

export default SkillContainer;
