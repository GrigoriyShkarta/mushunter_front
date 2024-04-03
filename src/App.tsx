import { JSX, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Header from './components/header';
import { Provider } from 'react-redux';
import { setupStore } from './store/store.ts';

function App(): JSX.Element {
	const store = setupStore();

	return (
		<Provider store={store}>
			<div className={'App'}>
				<Header />
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path={'/'} element={<HomePage />} />
						</Routes>
					</Suspense>
				</Router>
			</div>
		</Provider>

	);
}

export default App;
