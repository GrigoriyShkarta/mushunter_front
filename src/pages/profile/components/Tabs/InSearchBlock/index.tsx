import { FC } from 'react';
import { useUserStore } from '../../../store';
import s from './style.module.scss';
import { UserModal } from '../../../../../shared/constants';
import Button from '../../../../../components/buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import SkillContainer from '../../../../../components/skillContainer';
import Edit from '../../../../../components/editComponent';

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
	const { t } = useTranslation();

	if (profile?.id !== id && (!isLookingForBand || searchArray?.length === 0)) {
		return (
			<section className={s.section}>
				<p className={s.noInfoText}>{t('user.noInfo')}</p>
			</section>
		);
	}

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
				{profile?.id === id && <Edit openModal={openModal} modal={UserModal.SearchSettings} />}
			</div>
			<div className={s.skills}>
				{isLookingForBand && (
					<SkillContainer
						name={position?.name}
						styles={stylesLookingForBand}
						description={descriptionPosition}
						isLookingForBand
					/>
				)}

				{searchArray?.map((skill) => (
					<SkillContainer
						key={skill.id}
						name={skill.name}
						experience={skill.experience}
						styles={skill.styles}
						age={skill.age?.name}
						description={skill.description}
					/>
				))}
			</div>
		</section>
	);
};

export default InSearchBlock;
