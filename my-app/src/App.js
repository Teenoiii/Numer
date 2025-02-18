// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import Bisection from './Root/Bisection';
import FalsePosition from './Root/FalsePosition';
import NewtonRaphson from './Root/NewtonRaphson';
import OnePointIteration from './Root/OnePoint';


function App() {
  return ( 
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* {<p>Edit <code>src/App.js</code> and save to reload.</p>} */}
          <Link to="/Bisection" className="App-link">Go to Bisection</Link>
          <Link to="/Falseposition" className="App-link">Go to FalsePosition</Link>
          <Link to="/NewtonRaphson" className="App-link">Go to NewtonRaphson</Link>
          <Link to="/OnePoint" className="App-link">Go to OnePoint</Link>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bisection" element={<Bisection />} />
          <Route path="/Falseposition" element={<FalsePosition/>} />
          <Route path="/NewtonRaphson" element={<NewtonRaphson/>} />
          <Route path="/OnePoint" element={<OnePointIteration/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}

export default App;
