import { FC } from 'react';
import { useUserStore } from '../../../store';
import s from './style.module.scss';
import { UserModal } from '../../../../../shared/constants';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Button from '../../../../../components/buttons/Button.tsx';
import { useTranslation } from 'react-i18next';

interface Skill {
	description?: string;
	experience: number;
	name: {
		en: string;
		ua: string;
	};
}

interface Props {
	id: number;
	openModal: (name: UserModal) => void;
	searchArray: Skill[];
}

const InSearchBlock: FC<Props> = ({ id, openModal, searchArray }) => {
	const profile = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	if (profile?.id === id && searchArray.length === 0) {
		return (
			<section className={s.section}>
				<Button
					type={'button'}
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
				{searchArray.map((skill) => (
					<div className={s.skill}></div>
				))}
			</div>
		</section>
	);
};

export default InSearchBlock;
