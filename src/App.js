import React from 'react';
import logo from './logo.svg';
import './App.css';
import './SCSS/main.scss';
import HeaderComponent from "../src/Components/HeaderComponent";
import IndiaMapComponent from '../src/Components/IndiaMapComponent/IndiaMapComponent';


function App() {
  return (
    <div className="covid-dashboard-container">
      <HeaderComponent />
      
      <IndiaMapComponent />
      
    </div>
  );
}

export default App;
