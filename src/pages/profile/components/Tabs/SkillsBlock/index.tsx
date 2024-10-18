import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { UserModal } from '../../../../../shared/constants';
import { useUserStore } from '../../../store';
import Button from '../../../../../components/buttons/Button.tsx';
import SkillContainer from '../../../../../components/skillContainer';
import Edit from '../../../../../components/editComponent';

interface Props {
	id: number;
	skills?: {
		id: number;
		name: {
			ua: string;
			en: string;
		};
		experience: number;
		description?: string;
		styles: { id: number; name: string }[];
	}[];
	openModal: (name: UserModal) => void;
}

const SkillsBlock: FC<Props> = ({ skills, id, openModal }) => {
	const profile = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	if (profile?.id === id && skills?.length === 0) {
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

	if (profile?.id !== id && skills?.length === 0) {
		return (
			<section className={s.section}>
				<p className={s.noInfoText}>{t('user.noInfo')}</p>
			</section>
		);
	}

	return (
		<section className={s.section}>
			<div className={s.wrapper}>
				{profile?.id === id && <Edit openModal={openModal} modal={UserModal.SkillSettings} />}
				{skills &&
					skills?.map((skill) => (
						<SkillContainer
							key={skill.id}
							name={skill.name}
							experience={skill.experience}
							styles={skill.styles}
							description={skill.description}
							isSkill
						/>
					))}
			</div>
		</section>
	);
};

export default SkillsBlock;
