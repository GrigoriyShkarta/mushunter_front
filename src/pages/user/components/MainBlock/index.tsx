import { FC } from 'react';
import s from './style.module.scss';
import Background from './Background.tsx';
import { SvgDefaultAva } from '../../../../assets/svg';
import { MdEdit } from 'react-icons/md';

interface Props {
	firstName: string;
	lastName: string;
	ava?: string;
}

const MainBlock: FC<Props> = ({ firstName, lastName, ava }) => {
	return (
		<section className={s.section}>
			<Background />
			{ava ? <img className={s.ava} src={ava} alt="user_avatar" /> : <SvgDefaultAva className={s.ava} />}
			<div className={s.wrapper}>
				<MdEdit className={s.edit} size={'24px'} />
				<h1>
					{firstName} {lastName}
				</h1>
			</div>
		</section>
	);
};

export default MainBlock;
