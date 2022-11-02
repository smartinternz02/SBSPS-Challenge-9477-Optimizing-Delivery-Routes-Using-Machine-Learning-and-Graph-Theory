import React, { useEffect, useState, useContext, useReducer } from 'react'
import axios from 'axios';
import L, { LatLng, map } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../App.css'
import AddMarkers from '../components/addMarkers';
import Routing from '../components/Routing';
import { useNavigate } from 'react-router-dom'
import image from '../assets/Images/bg.jpg'

let markerArray = [];


const position = [11.004556, 76.961632]
document.body.style.background = "#2b2d2f";


function Form() {
    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 800);
    }

    const navigate = useNavigate();

    const route = () => {
        navigate('/route');
    }

    const HandleClick = event => {
        event.preventDefault();
        var myParams = {
            address: document.getElementById('addressInput').value
        }

        axios.post('/geocode', myParams)
            .then((res) => {

                for (let i = 0; i < res.data['latitude'].length; i++) {
                    markerArray.push(new LatLng(res.data['latitude'][i], res.data['longitude'][i]))
                    // console.log([res.data['latitude'][i], res.data['longitude'][i]])
                }
                // console.log(markerArray)
                // console.log(res.data)
            }) //lat, long
            .catch((err) => { console.log(err) })

    };

    function submitClick() {
        window.open('/route', );
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
                        {/* <h1>{Address}</h1> */}
                    </form>
                </div>
                <button type="submit" className='glow-on-hover' onClick={submitClick} style={{ marginTop: "-2px" }}>Display Route</button>
            </div>
            <div className='footer'>Made with 💖 by <a href='https://github.com/VishnuVardhanJS' target="_blank" rel="noopener noreferrer">Vishnu</a> & <a href='https://github.com/GrimWatch' target="_blank" rel="noopener noreferrer">Rishab</a></div>
        </ div>
    )
}

export default Form