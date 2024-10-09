import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserStore } from '../../store';
import Button from '../../../../components/buttons/Button.tsx';
import { UserModal } from '../../../../shared/constants';

interface Props {
	id: number;
	description?: string;
	openModal: (name: UserModal) => void;
}

const DescriptionBlock: FC<Props> = ({ description, id, openModal }) => {
	const user = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	if (!description) {
		return (
			<section className={s.section}>
				<h2 className={s.title}>{t('user.generalInformation')}</h2>
				<Button
					type={'button'}
					value={t('user.addSection')}
					className={s.addSection}
					func={() => openModal(UserModal.DescriptionSettings)}
				/>
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
			<h2 className={s.title}>{t('user.generalInformation')}</h2>
			<p className={s.text}>{description}</p>
		</section>
	);
};

export default DescriptionBlock;
