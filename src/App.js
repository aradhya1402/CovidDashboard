import React from 'react';
import logo from './logo.svg';
import './App.css';
import './SCSS/main.scss';
import HeaderComponent from "../src/Components/HeaderComponent";
import IndiaMapComponent from '../src/Components/IndiaMapComponent/IndiaMapComponent';
import MapDropDown from '../src/Components/MapDropdownComponent/MapDropdownComponent';
import LineMap from '../src/Components/LineMap/LineMap'
import { BrowserRouter as Router, Route  } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="covid-dashboard-container">
      <HeaderComponent />
      {/* <IndiaMapComponent /> */}
      <MapDropDown />

      <Route
            exact path='/indiaMap'
            render={(props) => <IndiaMapComponent {...props} />}
      />
       <Route
            exact path='/lineMap'
            render={(props) => <LineMap {...props} />}
      />
     
      
    </div>
    </Router>
  );
}

export default App;
