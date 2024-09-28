import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../pages/user/store';
import Button from '../buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import { SvgDefaultAva } from '../../assets/svg';

const ProfilePopup: FC = () => {
	const user = useUserStore((state) => state.user);
	const { t } = useTranslation();

	return (
		<div className={s.popup}>
			{!user ? (
				<Button type={'button'} value={t('general.singIn')} className={s.button} />
			) : (
				<ul className={s.profile}>
					<li className={s.profile__item}>
						<SvgDefaultAva /> Profile
					</li>
				</ul>
			)}
		</div>
	);
};

export default ProfilePopup;
