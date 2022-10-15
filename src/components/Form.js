import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import L, { LatLng, map } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import '../App.css'
import AddMarkers from '../components/addMarkers';
import Routing from '../components/Routing';

let markerArray = [];


const position = [11.004556, 76.961632]


function Form() {

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


    // const fetchRoute = () => {
    //     const [visible,setVisible]=useState(false);

    //     const handleModalOpen = () =>{
    //         setVisible(true)
    //       }

    //     axios.get('/route')
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch((err) => { console.log(err) })
    // }

    // console.log(markerArray)

    return (
        <>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=7rFCjcdeALOXb1a4DICF"
                />
                <AddMarkers />
            </MapContainer>
            <form onSubmit={HandleClick}>
                <input id='addressInput' type="text" required placeholder="Enter a location" name='address' />
                <button type="submit">Submit</button>
                {/* <h1>{Address}</h1> */}
            </form>
            <button type="submit">Display Route</button>
            <Routing />
        </ >
    )
}

export default Form