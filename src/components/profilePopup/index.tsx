import { Dispatch, FC, SetStateAction } from 'react';
import s from './style.module.scss';
import { useUserStore } from '../../pages/user/store';
import Button from '../buttons/Button.tsx';
import { useTranslation } from 'react-i18next';
import { SvgDefaultAva, SvgUaFlagIcon, SvgUsaFlagIcon } from '../../assets/svg';
import { Languages } from '../../shared/constants';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface Props {
	setShowPopup: Dispatch<SetStateAction<boolean>>;
	showPopup: boolean;
}

const ProfilePopup: FC<Props> = ({ setShowPopup, showPopup }) => {
	const user = useUserStore((state) => state.profile);
	const logOutProfile = useUserStore((state) => state.logOut);
	const { t, i18n } = useTranslation();
	const navigate = useNavigate();

	const changeLanguage = (lng: Languages): void => {
		i18n.changeLanguage(lng);
	};

	const logOut = (): void => {
		logOutProfile();
		localStorage.removeItem('user-storage');
		localStorage.removeItem('tokens');
		navigate('/');
	};

	return (
		<div className={`${s.popup} ${showPopup && s.visible}`} onMouseLeave={() => setShowPopup(false)}>
			{!user ? (
				<Button type={'button'} value={t('general.signIn')} className={s.button} func={() => navigate('/')} />
			) : (
				<ul className={s.profile}>
					<li className={s.profile__item} onClick={() => navigate('user/')}>
						<SvgDefaultAva /> <p className={s.profile__item_text}>{t('general.myProfile')}</p>
					</li>
					<li className={s.profile__item} onClick={logOut}>
						<IoIosLogOut /> <p className={s.profile__item_text}>{t('general.exit')}</p>
					</li>
				</ul>
			)}
			<hr className={s.line} />
			<div className={s.panel}>
				<div className={s.panel__block} onClick={() => changeLanguage(Languages.UK)}>
					<SvgUaFlagIcon /> <p className={s.flag_text}>UA</p>
				</div>
				<div className={s.panel__block} onClick={() => changeLanguage(Languages.EN)}>
					<SvgUsaFlagIcon /> <p className={s.flag_text}>EN</p>
				</div>
			</div>
		</div>
	);
};

export default ProfilePopup;
