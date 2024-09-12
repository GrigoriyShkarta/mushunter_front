import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../../shared/constants';

interface Props {
	skills: {
		id: number;
		name: {
			ua: string;
			en: string;
		};
		experience: number;
	}[];
}

const SkillsBlock: FC<Props> = ({ skills }) => {
	const { t, i18n } = useTranslation();

	return (
		<section className={s.section}>
			<h2>{t('user.skills')}</h2>
			<div className={s.wrapper}>
				{skills.length > 0 &&
					skills?.map((skill) => (
						<div className={s.skill} key={skill.id}>
							<p>{skill.name[i18n.language as Languages]}</p>
							<div className={s.progress_bar_container}>
								<div className={s.progress_bar}>
									<div className={s.progress} style={{ width: `${skill.experience}%` }} />
								</div>
								{/*<p>{skill.experience > 10 ? 'более 10 лет' : `${skill.experience} лет`}</p>*/}
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default SkillsBlock;
