import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Marker } from "react-leaflet";
import axios from 'axios';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});


function AddMarkers() {
  // const initialMarkers = [new LatLng(51.505, -0.09)];
  const [markers, setMarkers] = useState([]);

  // const map = useMapEvents({
  //   click(e) {
  //     markers.push(e.latlng);
  //     setMarkers((prevValue) => [...prevValue, e.latlng]);
  //   }
  // });

  useEffect(() => {
    axios.get('/geocode')
            .then((res) => {
              for (let i = 0; i < res.data['latitude'].length; i++) {
                markers.push(new LatLng(res.data['latitude'][i], res.data['longitude'][i]))
                setMarkers((prevValue) => [...prevValue, new LatLng(res.data['latitude'][i], res.data['longitude'][i])]);
            }
                // console.log(res.data)
            })
            .catch((err) => { console.log(err) })
    console.log(markers)
  }, [])

  return (
    <>
      {markers.map(marker => <Marker position={marker} ></Marker>)}
    </>
  );
}

export default AddMarkers;