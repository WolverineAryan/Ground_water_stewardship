import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import Charts from "./components/Charts";
import Prediction from "./components/Prediction";

function App() {
  const [depth, setDepth] = useState(25);

  useEffect(() => {
    setInterval(() => {
      setDepth(d => d + (Math.random() - 0.5));
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Groundwater Stewardship Dashboard</h1>
      <p>Live Sensor Depth: {depth.toFixed(2)} m</p>

      <MapView />
      <Charts />
      <Prediction />
    </div>
  );
}

export default App;
