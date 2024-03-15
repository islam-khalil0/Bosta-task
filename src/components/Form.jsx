import React, { useState } from "react";
import { useTrackingContext } from "../Context/TrackingContext";

const Form = () => {
  const { fetchShipmentTrackingInfo, trackingInfo } = useTrackingContext();
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleFetchTrackingInfo = async (event) => {
    event.preventDefault();
    if (trackingNumber.trim() !== "") {
      await fetchShipmentTrackingInfo(trackingNumber);
      console.log(trackingInfo);
    }
  };

  return (
    <form onSubmit={handleFetchTrackingInfo} className="flex gap-2 p-2">
      <input
        type="text"
        placeholder="ادخل رقم الشحنة"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mr-2"
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        تتبع شحنتك
      </button>
    </form>
  );
};

export default Form;
