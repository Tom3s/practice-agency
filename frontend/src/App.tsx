import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import ResultsPage from './ResultsPage';

function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path='/search' element={<SearchPage />} />
			<Route path='/' element={<Navigate to={'/search'} />} />
			<Route path='/results' element={<ResultsPage />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
