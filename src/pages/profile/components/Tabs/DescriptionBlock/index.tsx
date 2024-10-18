import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../../store';
import Button from '../../../../../components/buttons/Button.tsx';
import { UserModal } from '../../../../../shared/constants';
import Edit from '../../../../../components/editComponent';

interface Props {
	id: number;
	description?: string;
	openModal: (name: UserModal) => void;
}

const DescriptionBlock: FC<Props> = ({ description, id, openModal }) => {
	const profile = useUserStore((state) => state.profile);
	const { t } = useTranslation();

	if (profile?.id !== id && !description) {
		return (
			<section className={s.section}>
				<p className={s.noInfoText}>{t('user.noInfo')}</p>
			</section>
		);
	}

	if (profile?.id === id && !description) {
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

	return (
		<section className={s.section}>
			{profile?.id === id && <Edit openModal={openModal} modal={UserModal.DescriptionSettings} />}
			<p className={s.text}>{description}</p>
		</section>
	);
};

export default DescriptionBlock;
