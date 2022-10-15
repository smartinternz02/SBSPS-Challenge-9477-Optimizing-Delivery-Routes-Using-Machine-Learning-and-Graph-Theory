import { useEffect, useState } from "react";
import L, { LatLng } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { Map, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

function AddMarkers() {
  const initialMarkers = [new LatLng(51.505, -0.09)];
  const [markers, setMarkers] = useState(initialMarkers);

  const map = useMapEvents({
    click(e) {
      markers.push(e.latlng);
      setMarkers((prevValue) => [...prevValue, e.latlng]);
    }
  });

  return (
    <>
      {markers.map(marker => <Marker position={marker} ></Marker>)}
    </>
  );
}

export default AddMarkers;