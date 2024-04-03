import { FC } from 'react';
import { GiBinoculars } from 'react-icons/gi';
import { BiSearchAlt, BiSolidUser } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { AiOutlineMail, AiOutlineBell } from 'react-icons/ai';
import s from './header.module.scss';

const Header: FC = () => {
	return (
		<header className={s.header}>
			<div className={s.container}>
				<div className={s.logo}>
					<div className={s.logo__wrapper}>
						<GiBinoculars size={'2rem'} color="white" />
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
							<BiSolidUser className={s.navigate__item_icon} />
							<span className={s.navigate__item_text}>Musicians</span>
						</li>
						<li className={s.navigate__item}>
							<HiUserGroup className={s.navigate__item_icon} />
							<span className={s.navigate__item_text}>Groups</span>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
