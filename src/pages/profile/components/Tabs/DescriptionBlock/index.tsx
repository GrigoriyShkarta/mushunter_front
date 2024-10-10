import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserStore } from '../../../store';
import Button from '../../../../../components/buttons/Button.tsx';
import { UserModal } from '../../../../../shared/constants';

interface Props {
	id: number;
	description?: string;
	openModal: (name: UserModal) => void;
	profileId?: number;
}

const DescriptionBlock: FC<Props> = ({ description, id, openModal, profileId }) => {
	const user = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	if (profileId === id && !description) {
		return (
			<section className={s.section}>
				<Button
					type={'button'}
					value={t('user.addSection')}
					className={s.addSection}
					func={() => openModal(UserModal.DescriptionSettings)}
				/>
			</section>
		);
	}

	if (profileId !== id && !description) {
		return (
			<section className={s.section}>
				<p className={s.noInfoText}>There is no information</p>
			</section>
		);
	}

	return (
		<section className={s.section}>
			{user?.id === id && (
				<div className={s.edit} onClick={() => openModal(UserModal.DescriptionSettings)}>
					<MdOutlineModeEditOutline size={'24px'} />
				</div>
			)}
			<p className={s.text}>{description}</p>
		</section>
	);
};

export default DescriptionBlock;
