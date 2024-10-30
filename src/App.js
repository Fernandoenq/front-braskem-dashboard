import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginNavbar from './components/LoginNavbar';
import Dashboard from './pages/Dashboard';
import Transfer from './components/Transfer';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';


function ConditionalNavbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isNotFoundPage = location.pathname === '/404'; // Assumindo que sua rota de NotFoundPage seja "/404"

  if (isLoginPage) {
    return <LoginNavbar />;
  }

  if (isNotFoundPage) {
    return null; // Nenhuma navbar na página de "Página não encontrada"
  }

  return <Navbar />;
}

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('OrganizerId') !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '7px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/transfer"
              element={
                <PrivateRoute>
                  <Transfer />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


//titulo 
//botõpes no meio tablet mini


