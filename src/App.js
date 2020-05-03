import React from 'react';
import logo from './logo.svg';
import './App.css';
import './SCSS/main.scss';
import HeaderComponent from "../src/Components/HeaderComponent";


function App() {
  return (
    <div className="covid-dashboard-container">
      <HeaderComponent />
    </div>
  );
}

export default App;
