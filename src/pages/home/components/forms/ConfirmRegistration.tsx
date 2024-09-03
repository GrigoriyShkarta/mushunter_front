import { FC } from 'react';
import s from './Forms.module.scss';
import { useTranslation } from 'react-i18next';

const ConfirmRegistration: FC = () => {
	const { t } = useTranslation();

	return (
		<div className={s.form}>
			<h1 className={s.form__title}>{t('home.finishRegistration')}</h1>
			<p className={s.form__text}>{t('home.checkSpam')}</p>
		</div>
	);
};

export default ConfirmRegistration;
