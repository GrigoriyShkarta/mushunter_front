import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import s from './style.module.scss';

interface Props {
	firstName: string;
	lastName: string;
	ava?: string;
	id: number;
}

const ManagerBlock: FC<Props> = ({ firstName, lastName, id }) => {
	const { t } = useTranslation();

	return (
		<div className={s.container}>
			<p className={s.managerText}>{t('band.manager')}</p>
		</div>
	);
};

export default ManagerBlock;
