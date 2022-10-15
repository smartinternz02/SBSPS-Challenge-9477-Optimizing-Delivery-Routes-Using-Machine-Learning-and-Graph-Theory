import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css';
// import AddMarkers from './components/addMarkers';
import Form from './components/Form';
import React, { useEffect } from 'react';




const position = [51.505, -0.09]

function App() {
  return (
    <div className='mapContainer'>
      <Form />
    </div>
  );
}

export default App;
