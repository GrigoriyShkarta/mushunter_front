import { FC, useEffect } from 'react';
import s from './style.module.scss';
import { useUserStore } from './store';
import { MainBlock } from './components';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../../services/endpoints/user';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../shared/constants';
import SkillsBlock from './components/SkillsBlock';

const User: FC = () => {
	const user = useUserStore((state) => state.user);
	const { i18n } = useTranslation();
	const navigate = useNavigate();

	console.log('user', user);

	useEffect(() => {
		if (!user) {
			navigate('/');
		}

		const check = async () => {
			const res = await getMe();
			console.log('check', res);
		};
		// check();
	}, [navigate, user]);

	if (!user) {
		return null;
	}

	return (
		<div className={s.container}>
			<MainBlock
				id={user.id}
				firstName={user?.firstname}
				lastName={user?.lastname}
				city={user?.city && user.city[i18n.language as Languages]}
				skills={user?.skills && user.skills.map((skill) => skill.name[i18n.language as Languages])}
				birthday={user?.birthday}
				likes={user.likes}
				links={user.links}
				phone={user?.phone}
			/>
			<SkillsBlock skills={user.skills} />
		</div>
	);
};

export default User;
