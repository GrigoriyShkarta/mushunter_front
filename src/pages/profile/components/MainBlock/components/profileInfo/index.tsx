import { FC, Fragment } from 'react';
import s from './style.module.scss';
import { capitalizeFirstLetter } from '../../../../../../shared/helpers/capitalizeFirstLetter.ts';
import { useTranslation } from 'react-i18next';
import { IoIosMusicalNote } from 'react-icons/io';

interface Props {
	firstName?: string;
	lastName?: string;
	groupName?: string;
	skills?: string[];
	isLookingForBand: boolean;
	lookingForSkills: string[];
	styles: string[];
}

const Index: FC<Props> = ({ firstName, groupName, isLookingForBand, lastName, lookingForSkills, skills, styles }) => {
	const { t } = useTranslation();

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.block}>
					<h1>
						{firstName} {lastName} {groupName}
					</h1>
					<div className={s.arrayWrapper}>
						{skills?.map((skill) => (
							<div className={s.itemSkill} key={skill}>
								{skill}
							</div>
						))}
					</div>
				</div>

				{(lookingForSkills.length > 0 || isLookingForBand) && (
					<div className={s.statuses}>
						{lookingForSkills.length > 0 && (
							<div className={s.statusSearch}>
								<p className={s.statusSearch__text}>{capitalizeFirstLetter(t('general.lookingForSkills'))}:</p>
								{lookingForSkills.map((skill) => (
									<div key={skill} className={s.skillName}>
										{skill}
									</div>
								))}
							</div>
						)}
						{isLookingForBand && <div className={s.statusBand}>{t('general.isLookingForBand')}</div>}
					</div>
				)}
			</div>

			{styles.length > 0 && (
				<div className={s.styleBlock}>
					<div className={s.top}>
						<IoIosMusicalNote />
						<h4 className={s.stylesTitle}>{t('user.basicStyles')}</h4>
					</div>
					<div className={s.stylesWrapper}>
						{styles.map((style, index) => (
							<Fragment key={style}>
								<p>{style}</p>
								{index < styles.length - 1 && <span> • </span>}
							</Fragment>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Index;
