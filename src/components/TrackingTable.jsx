import React, { useEffect, useState } from "react";
import { useTrackingContext } from "../Context/TrackingContext";

const TrackingTable = () => {
  const { trackingInfo } = useTrackingContext();
  const [statePackage, setStatePackage] = useState("");

  useEffect(() => {
    if (trackingInfo) {
      calculateStateOfPackage();
    }
  }, [trackingInfo]);

  const calculateStateOfPackage = () => {
    if (!trackingInfo) return;

    const { state } = trackingInfo.CurrentStatus;
    let packageState = "";

    switch (state) {
      case "DELIVERED_TO_SENDER":
        packageState = "الشحنة  خرجت للتسليم";
        break;
      case "DELIVERED":
        packageState = "تم تسليم الشحنة";
        break;
      case "CANCELLED":
        packageState = "تم الغاء الشحنة";
        break;
      default:
        packageState = "";
    }

    setStatePackage(packageState);
  };

  const arrayForTest = [
    {
      branch: "مدينة نصر",
      data: trackingInfo?.PromisedDate?.substring(0, 10) || "",
      time: "12:30 PM",
      details: "تم انشاء الشحنة",
    },
    {
      branch: "مدينة نصر",
      data: trackingInfo?.PromisedDate?.substring(0, 10) || "",
      time: "12:30 PM",
      details: "تم استلام الشحنة من التاجر",
    },
    {
      branch: "مدينة نصر",
      data: trackingInfo?.PromisedDate?.substring(0, 10) || "",
      time: "12:30 PM",
      details: "الشحنة خرجت للتسليم",
    },
    {
      branch: "مدينة نصر",
      data: trackingInfo?.PromisedDate?.substring(0, 10) || "",
      time: "12:30 PM",
      details: statePackage,
    },
  ];

  return (
    <div className="container mx-auto mt-8 flex max-md:justify-center">
      <table className="table-auto">
        <caption className="caption-side-bottom text-right py-2 text-gray-600">
          تفاصيل الشحنة
        </caption>
        <thead className="text-[#8B909E]">
          <tr>
            <TableHeader>الفرع</TableHeader>
            {!isCancelledState(trackingInfo) && (
              <TableHeader>التاريخ</TableHeader>
            )}
            <TableHeader>الوقت</TableHeader>
            <TableHeader>تفاصيل</TableHeader>
          </tr>
        </thead>
        <tbody>
          {arrayForTest.map((item, index) => (
            <TableRow
              key={index}
              item={item}
              isCancelled={isCancelledState(trackingInfo)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => (
  <th scope="col" className="px-14 py-4 text-right max-md:p-2">
    {children}
  </th>
);

const TableRow = ({ item, isCancelled }) => (
  <tr>
    <TableCell>{item.branch}</TableCell>
    {!isCancelled && <TableCell>{item.data}</TableCell>}
    <TableCell>{item.time}</TableCell>
    <TableCell>{item.details}</TableCell>
  </tr>
);

const TableCell = ({ children }) => (
  <td className="px-14 py-4 text-gray-600 text-right max-md:p-2">{children}</td>
);

const isCancelledState = (trackingInfo) => {
  return trackingInfo?.CurrentStatus?.state === "CANCELLED";
};

export default TrackingTable;
