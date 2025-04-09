import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Routes from './Routes';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense>
          <Routes />
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
