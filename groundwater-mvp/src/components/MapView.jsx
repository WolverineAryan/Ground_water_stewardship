import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import data from "../data/groundwater.json";
import "leaflet/dist/leaflet.css";

export default function MapView() {
  const latest = data[data.length - 1];

  return (
    <MapContainer
      center={[latest.lat, latest.lng]}
      zoom={10}
      style={{ height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latest.lat, latest.lng]}>
        <Popup>
          Nashik Groundwater Depth: {latest.depth} m
        </Popup>
      </Marker>
    </MapContainer>
  );
}
