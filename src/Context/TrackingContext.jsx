import React, { createContext, useState, useContext } from "react";

const TrackingContext = createContext();

const TrackingProvider = ({ children }) => {
  const [trackingInfo, setTrackingInfo] = useState({});

  // Function to fetch tracking info
  const fetchShipmentTrackingInfo = async (trackingNumber) => {
    try {
      const response = await fetch(
        `https://tracking.bosta.co/shipments/track/${trackingNumber}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tracking information");
      }
      const data = await response.json();
      setTrackingInfo(data);
    } catch (error) {
      console.error("Error fetching tracking information:", error.message);
    }
  };

  return (
    <TrackingContext.Provider
      value={{ trackingInfo, fetchShipmentTrackingInfo }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

const useTrackingContext = () => {
  return useContext(TrackingContext);
};

export { TrackingProvider, useTrackingContext };
