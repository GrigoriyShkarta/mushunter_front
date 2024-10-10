import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { Languages, UserModal } from '../../../../../shared/constants';
import { getAgeWord } from '../../../../../shared/helpers/getYears.ts';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserStore } from '../../../store';
import Button from '../../../../../components/buttons/Button.tsx';

interface Props {
	id: number;
	skills: {
		id: number;
		name: {
			ua: string;
			en: string;
		};
		experience: number;
		description?: string;
	}[];
	openModal: (name: UserModal) => void;
	profileId?: number;
}

const SkillsBlock: FC<Props> = ({ skills, id, openModal, profileId }) => {
	const user = useUserStore((state) => state.profile);
	const { t, i18n } = useTranslation();

	if (profileId === id && skills.length === 0) {
		return (
			<section className={s.section}>
				<Button
					type={'button'}
					value={t('user.addSection')}
					className={s.addSection}
					func={() => openModal(UserModal.SkillSettings)}
				/>
			</section>
		);
	}

	if (profileId !== id && skills.length === 0) {
		return (
			<section className={s.section}>
				<p className={s.noInfoText}>There is no information</p>
			</section>
		);
	}

	return (
		<section className={s.section}>
			<div className={s.wrapper}>
				{user?.id === id && (
					<div className={s.edit} onClick={() => openModal(UserModal.SkillSettings)}>
						<MdOutlineModeEditOutline size={'24px'} />
					</div>
				)}
				{skills.length > 0 &&
					skills?.map((skill) => (
						<div className={s.skill} key={skill.id}>
							<p className={s.skill__name}>{skill.name[i18n.language as Languages]}</p>
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
							<p>{skill.description}</p>
						</div>
					))}
			</div>
		</section>
	);
};

export default SkillsBlock;
