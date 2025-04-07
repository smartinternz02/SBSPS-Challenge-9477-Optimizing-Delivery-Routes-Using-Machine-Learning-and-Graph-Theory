import React, { useState, useEffect } from 'react';
import { LatLng } from "leaflet";
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddMarkers from '../components/addMarkers';

let markerArray = [];
const position = [11.004556, 76.961632];
document.body.style.background = "#2b2d2f";

function Form() {
    const [locations, setLocations] = useState(() => {
        // Initialize from localStorage or empty array if nothing stored
        const saved = localStorage.getItem('locations');
        return saved ? JSON.parse(saved) : [];
    });
    
    const navigate = useNavigate();

    // Save to localStorage whenever locations change
    useEffect(() => {
        localStorage.setItem('locations', JSON.stringify(locations));
    }, [locations]);

    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 800);
    }

    const HandleClick = event => {
        event.preventDefault();
        const address = document.getElementById('addressInput').value;
        
        // Add the location to the list
        setLocations(prev => [...prev, address]);

        var myParams = {
            address: address
        }

        axios.post('/geocode', myParams)
            .then((res) => {
                for (let i = 0; i < res.data['latitude'].length; i++) {
                    markerArray.push(new LatLng(res.data['latitude'][i], res.data['longitude'][i]))
                }
            })
            .catch((err) => { console.log(err) })
    };

    function submitClick() {
        window.open('/route');
    }

    return (
        <div className='mainContainer'>
            <div className='mapContainer glow-on-hover-2'>
                <MapContainer center={position} zoom={12}>
                    <TileLayer
                        url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=7rFCjcdeALOXb1a4DICF"
                    />
                    <AddMarkers />
                </MapContainer>
            </div>
            <div className='logo'></div>
            <div className='formContainer'>
                <div className='form'>
                    <form onSubmit={HandleClick}>
                        <input id='addressInput' type="text" required placeholder="Enter a location" name='address' />
                        <button type="submit" className='glow-on-hover' onClick={refreshPage}>Submit</button>
                    </form>
                </div>
                <button type="submit" className='glow-on-hover' onClick={submitClick} style={{ marginTop: "-2px" }}>Get Route</button>
            </div>
            
            {/* Location List */}
            <div className='location-list'>
                <div className='location-header'>
                    <h3>Locations</h3>
                    <span className='location-count'>{locations.length}</span>
                </div>
                <ul>
                    {locations.map((location, index) => (
                        <li key={index}>{location}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Form;