import { FC } from 'react';
import s from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useUserStore } from '../../store';

interface Props {
	id: number;
	description?: string;
}

const DescriptionBlock: FC<Props> = ({ description, id }) => {
	const user = useUserStore((state) => state.user);
	const { t } = useTranslation();

	return (
		<section className={s.section}>
			{user?.id === id && (
				<div className={s.edit}>
					<MdOutlineModeEditOutline size={'24px'} />
				</div>
			)}
			<h2 className={s.title}>{t('user.generalInformation')}</h2>
			<p className={s.text}>{description}</p>
		</section>
	);
};

export default DescriptionBlock;
