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
      {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=7rFCjcdeALOXb1a4DICF"
        />
        <AddMarkers />
      </MapContainer> */}
      <Form />
    </div>
  );
}

export default App;
