import { FC } from 'react';
import Description from './components/Description';
import Form from './components/Form';
import s from './HomePage.module.scss';

const HomePage: FC = () => {
	return (
		<div className={s.container}>
			<Description />
			<Form />
		</div>
	);
};

export default HomePage;
