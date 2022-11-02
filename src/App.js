import './App.css';
import 'leaflet/dist/leaflet.css';
import Form from './components/Form';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Routing from './components/Routing';





const position = [51.505, -0.09]

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Form />} />
        <Route path="/route" element={<Routing />}/>
      </Routes>
    </Router>
  );
}

export default App;
