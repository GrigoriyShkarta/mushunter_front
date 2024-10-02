import { FC, useState } from 'react';
import { GiBinoculars } from 'react-icons/gi';
import { BiSolidUser } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import s from './header.module.scss';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../pages/user/store';
import { SvgDefaultAva } from '../../assets/svg';
import { MdArrowDropDown } from 'react-icons/md';
import { TiArrowSortedDown } from 'react-icons/ti';
import ProfilePopup from '../profilePopup';

const Header: FC = () => {
	const { i18n } = useTranslation();
	const user = useUserStore((state) => state.profile);
	const [showPopup, setShowPopup] = useState(false);

	return (
		<header className={s.header}>
			<div className={s.container}>
				<div className={s.logo}>
					<div className={s.logo__wrapper}>
						<GiBinoculars size={'2rem'} color="#ed6b15" />
					</div>
					<h1 className={s.logo__name}>MusHunter</h1>
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
						<li className={s.navigate__item} onClick={() => setShowPopup(true)}>
							<SvgDefaultAva className={s.ava} />
							<span className={s.navigate__item_text}>
								Profile <TiArrowSortedDown size={'16px'} />
							</span>
						</li>
					</ul>
				</nav>
			</div>
			{showPopup && <ProfilePopup setShowPopup={setShowPopup} showPopup={showPopup} />}
		</header>
	);
};

export default Header;
