import React from 'react';
import logo from './logo.svg';
import './App.css';

import LocationForm from './components/location-form';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <LocationForm />

      </header>
    </div>
  );
}

export default App;
