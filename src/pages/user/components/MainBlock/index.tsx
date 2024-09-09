import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { SvgDefaultAva } from '../../../../assets/svg';
import { MdOutlineModeEditOutline } from 'react-icons/md';

interface Props {
	firstName: string;
	lastName: string;
	city?: string;
	ava?: string;
}

const MainBlock: FC<Props> = ({ firstName, lastName, ava, city }) => {
	return (
		<section className={s.section}>
			<Background />
			{ava ? <img className={s.ava} src={ava} alt="user_avatar" /> : <SvgDefaultAva className={s.ava} />}
			<div className={s.wrapper}>
				<div className={s.edit}>
					<MdOutlineModeEditOutline size={'24px'} />
				</div>
				<h1>
					{firstName} {lastName}
				</h1>
				{city && <span className={s.greyText}>{city}</span>}
			</div>
		</section>
	);
};

export default MainBlock;
