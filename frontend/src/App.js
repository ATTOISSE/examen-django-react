import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import AdminDashboard from './components/admin';
import Login from './components/authentication/login';
import { Register } from './components/authentication/register';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utlis/PrivateRoute';
import { Loan } from './components/loans/list';
import { Catalog } from './components/cataog';
import Home from './components';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/loan" element={<Loan />} />
            <Route element={<PrivateRoute />}>
              <Route path="/admin/*" element={<AdminDashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
              <Route path="/catalog" element={<Catalog />} />

            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
