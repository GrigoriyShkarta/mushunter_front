import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { PiUserCircleThin } from 'react-icons/pi';

interface Props {
	firstName: string;
	lastName: string;
	ava?: string;
}

const MainBlock: FC<Props> = ({ firstName, lastName, ava }) => {
	return (
		<section className={s.section}>
			<Background />
			{ava ? <img src={ava} alt="user_avatar" /> : <PiUserCircleThin size={'152px'} />}
			<div className={s.wrapper}></div>
		</section>
	);
};

export default MainBlock;
