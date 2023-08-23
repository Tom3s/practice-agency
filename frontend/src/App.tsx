import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import ResultsPage from './ResultsPage';
import SinglePropertyPage from './SinglePropertyPage';

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
