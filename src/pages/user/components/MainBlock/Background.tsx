import { FC } from 'react';
import s from './style.module.scss';

interface Props {
	bgColor?: string;
}

const Background: FC<Props> = ({ bgColor }) => {
	return <div className={s.background} style={{ backgroundColor: bgColor || '#ed6b15' }}></div>;
};

export default Background;
