import React, { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { appRoutes } from './routes';

import './App.css'

function AppRouter() {
  const element = useRoutes(appRoutes);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  )
}

export default App
