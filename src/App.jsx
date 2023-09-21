import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ContractForm from './components/ContractForm/ContractForm.jsx';
import LegalReview from './components/LegalReview/LegalReview.jsx';
import ManagerDashboard from './components/ManagerDashboard/ManagerDashboard.jsx';
import images from './images/logo.png'
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <img 
          src={images} 
          alt="logo" 
          className='nav-logo'
        />
        <ul className='nav-list'>
          <li className='nav-item'>
            <Link to="/contract-form">Trade and Contracting</Link>
          </li>

          <li className='nav-item'>
            <Link to="/legal-review">Legal Review</Link>
          </li>

          <li className='nav-item'>
            <Link to="/manager-dashboard">Manager Dashboard</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/contract-form" element={<ContractForm />} />
        <Route path="/legal-review" element={<LegalReview />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;