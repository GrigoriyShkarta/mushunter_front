import { FC } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate } from 'react-router-dom';

const User: FC = () => {
	const user = useUserStore((state) => state.user);
	const navigate = useNavigate();

	if (!user) {
		navigate('/');
		return null;
	}

	return (
		<div className={s.container}>
			<MainBlock firstName={user.firstname} lastName={user.lastname} />
		</div>
	);
};

export default User;
