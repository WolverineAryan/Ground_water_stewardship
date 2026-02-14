import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import HeatmapLegend from "./HeatmapLegend";
import { getRisk } from "../utils/riskLevel";

/* Heatmap Layer Component */
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Convert groundwater data → heat points
    const heatPoints = data.map((item) => {
      // Demo coordinates around Nashik
      const lat = 19.99 + Math.random() * 0.05;
      const lng = 73.78 + Math.random() * 0.05;

      const risk = getRisk(item.depth);

      // intensity (0–1)
      let intensity = 0.3;

      if (risk.label === "Warning") intensity = 0.6;
      if (risk.label === "Critical") intensity = 0.9;

      return [lat, lng, intensity];
    });

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 30,
      blur: 25,
      maxZoom: 10,
      gradient: {
        0.3: "green",
        0.6: "yellow",
        0.9: "red",
      },
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
}

export default function MapView({ data }) {
  return (
    <MapContainer
      center={[19.9975, 73.7898]}
      zoom={11}
      style={{ height: "350px", marginBottom: "20px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <HeatmapLayer data={data} />
      <HeatmapLegend />
    </MapContainer>
  );
}
