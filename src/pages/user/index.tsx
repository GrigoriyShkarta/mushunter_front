import { FC, useEffect } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../services/endpoints/user';

const User: FC = () => {
	const user = useUserStore((state) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/');
		}

		const check = async () => {
			const res = await getMe();
			console.log('check', res);
		};
		check();
	}, [navigate, user]);

	if (!user) {
		return null;
	}

	return (
		<div className={s.container}>
			<MainBlock firstName={user.firstname} lastName={user.lastname} city={user?.city} />
		</div>
	);
};

export default User;
