import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { Languages, UserModal } from '../../../../shared/constants';
import { getAgeWord } from '../../../../shared/helpers/getYears.ts';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserStore } from '../../store';
import Button from '../../../../components/buttons/Button.tsx';

interface Props {
	id: number;
	skills: {
		id: number;
		name: {
			ua: string;
			en: string;
		};
		experience: number;
	}[];
	openModal: (name: UserModal) => void;
}

const SkillsBlock: FC<Props> = ({ skills, id, openModal }) => {
	const user = useUserStore((state) => state.profile);
	const { t, i18n } = useTranslation();

	if (skills.length === 0) {
		return (
			<section className={s.section}>
				<h2 className={s.title}>{t('user.skills')}</h2>
				<Button
					type={'button'}
					value={t('user.addSection')}
					className={s.addSection}
					func={() => openModal(UserModal.SkillSettings)}
				/>
			</section>
		);
	}

	return (
		<section className={s.section}>
			<h2 className={s.title}>{t('user.skills')}</h2>
			<div className={s.wrapper}>
				{user?.id === id && (
					<div className={s.edit} onClick={() => openModal(UserModal.SkillSettings)}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
				{skills.length > 0 &&
					skills?.map((skill) => (
						<div className={s.skill} key={skill.id}>
							<p>{skill.name[i18n.language as Languages]}</p>
							<div className={s.progress_bar_container}>
								<div className={s.progress_bar}>
									<div className={s.progress} style={{ width: `${skill.experience * 10}%` }} />
								</div>
								<p className={s.progress_years}>
									{skill.experience > 10
										? t('user.more10Years')
										: `${getAgeWord(skill.experience, i18n.language as Languages)}`}
								</p>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default SkillsBlock;
