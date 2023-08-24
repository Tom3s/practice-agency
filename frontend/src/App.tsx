import React from 'react';
import logo from './logo.svg';
import './stylesheets/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import SearchPage from './pages/SearchPage';
import SinglePropertyPage from './pages/SinglePropertyPage';

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path='/search' element={<SearchPage />} />
			<Route path='/' element={<Navigate to={'/search'} />} />
			<Route path='/results' element={<ResultsPage />} />
			<Route path='/property' element={<SinglePropertyPage />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
