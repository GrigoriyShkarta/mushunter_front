import { JSX, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n.ts';
import Header from './components/header';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from './shared/constants';
import ThemeProvider from './shared/context';

const HomePage = lazy(() => import('./pages/home'));
const UserPage = lazy(() => import('./pages/user'));

function App(): JSX.Element {
	return (
		<ThemeProvider>
			<div className={'App'}>
				<Header />
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path={'/'} element={<HomePage />} />
							<Route path={'/user'} element={<UserPage />} />
						</Routes>
					</Suspense>
				</Router>
				<ToastContainer {...toastConfig} />
			</div>
		</ThemeProvider>
	);
}

export default App;
