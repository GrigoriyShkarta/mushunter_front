import { JSX, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n.ts';
import Header from './components/header';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from './shared/constants';

const HomePage = lazy(() => import('./pages/home'));
const ProfilePage = lazy(() => import('./pages/profile'));

function App(): JSX.Element {
	return (
		<div className={'App'}>
			<Router>
				<Header />
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path={'/'} element={<HomePage />} />
						<Route path={'/user'} element={<ProfilePage />} />
						<Route path={'/user/:id'} element={<ProfilePage />} />
						{/*<Route path={'/profile/:id'} element={<div>hi</div>} />*/}
					</Routes>
				</Suspense>
			</Router>
			<ToastContainer {...toastConfig} />
		</div>
	);
}

export default App;
