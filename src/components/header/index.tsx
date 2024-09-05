import { FC } from 'react';
import { GiBinoculars } from 'react-icons/gi';
import { BiSolidUser } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import s from './header.module.scss';
import { useTranslation } from 'react-i18next';

const Header: FC = () => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng: string): void => {
		i18n.changeLanguage(lng);
	};

	return (
		<header className={s.header}>
			<div className={s.container}>
				<div className={s.logo}>
					<div className={s.logo__wrapper}>
						<GiBinoculars size={'2rem'} color="#ed6b15" />
					</div>
					<h1 className={s.logo__name}>MusHunter</h1>
				</div>
				<div className={s.menu}>
					<div className={s.menu__container}>
						<span onClick={() => changeLanguage('en')}>EN</span>
						<span onClick={() => changeLanguage('ua')}>UA</span>
					</div>
					{/*<div className={s.menu__container}>*/}
					{/*	<span>Dark</span>*/}
					{/*	<span>Light</span>*/}
					{/*</div>*/}
				</div>
				<nav className={s.navigate}>
					<ul className={s.navigate__items}>
						{/* <li className={s.navigate_item}>
							<BiSearchAlt />
						</li>
						<li className={s.navigate_item}>
							<AiOutlineMail />
						</li>
						<li className={s.navigate_item}>
							<AiOutlineBell />
						</li> */}
						<li className={s.navigate__item}>
							<BiSolidUser className={s.navigate__item_icon} color={'#9DA6AA'} size={'25px'} />
							<span className={s.navigate__item_text}>Musicians</span>
						</li>
						<li className={s.navigate__item}>
							<HiUserGroup className={s.navigate__item_icon} color={'#9DA6AA'} size={'25px'} />
							<span className={s.navigate__item_text}>Groups</span>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
