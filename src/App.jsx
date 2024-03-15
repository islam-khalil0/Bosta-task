import React from "react";
import "./App.css";
import Form from "./components/Form";
import ProgressBar from "./components/ProgressBar";
import TrackingTable from "./components/TrackingTable";
import { useTrackingContext } from "./Context/TrackingContext";

function App() {
  const { trackingInfo } = useTrackingContext();

  if (Object.keys(trackingInfo).length > 0) {
    return (
      <div className="p-4 flex items-center flex-col gap-6 justify-center min-h-[100vh]">
        <Form />
        <ProgressBar />
        <TrackingTable />
      </div>
    );
  } else {
    return (
      <div className="p-4 flex items-center flex-col gap-6 justify-center min-h-[100vh]">
        <Form />
        <h1 className="text-2xl text-gray-400 text-center max-md:text-xl">
          ما من شئ لعرضه, ادخل رقم شحنتك
        </h1>
      </div>
    );
  }
}

export default App;
