import './stylesheets/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import SearchPage from './pages/SearchPage';
import SinglePropertyPage from './pages/SinglePropertyPage';


// basename={'/practice-agency'}
function App() {
  return (
    <BrowserRouter > 
		<Routes>
			<Route path='/' element={<Navigate to={'/search'} />} />
			<Route path='/search' element={<SearchPage />} />
			<Route path='/results' element={<ResultsPage />} />
			<Route path='/property' element={<SinglePropertyPage />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
