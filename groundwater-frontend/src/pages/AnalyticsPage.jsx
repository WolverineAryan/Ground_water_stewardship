import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ModelTrainer from "../components/ModelTrainer";
import Predictor from "../components/Predictor";
import PredictionPanel from "../components/PredictionPanel";
import "../layout/layout.css";

export default function AnalyticsPage() {
  return (
    <div className="app-container">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="content">
          <ModelTrainer />
          <Predictor />
          <PredictionPanel />
        </div>
      </div>
    </div>
  );
}
