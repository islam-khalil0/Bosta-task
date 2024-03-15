import React, { useEffect, useState } from "react";
import { useTrackingContext } from "../Context/TrackingContext";

const TrackingTable = () => {
  const { trackingInfo } = useTrackingContext();
  const [statePackage, setStatePackage] = useState("");

  const calculateStateOfPackage = () => {
    if (trackingInfo?.CurrentStatus?.state === "DELIVERED_TO_SENDER") {
      setStatePackage("الشحنة  خرجت للتسليم");
    } else if (trackingInfo?.CurrentStatus?.state === "DELIVERED") {
      setStatePackage("تم تسليم الشحنة");
    } else if (trackingInfo?.CurrentStatus?.state === "CANCELLED") {
      setStatePackage("تم الغاء الشحنة");
    } else {
      setStatePackage("");
    }
  };

  useEffect(() => {
    if (trackingInfo) {
      calculateStateOfPackage();
    }
  }, [trackingInfo]);

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
            <th scope="col" className="px-14 py-4 text-right max-md:p-2">
              الفرع
            </th>
            {trackingInfo?.CurrentStatus?.state === "CANCELLED" ? null : (
              <th scope="col" className="px-14 py-4 text-right max-md:p-2">
                التاريخ
              </th>
            )}
            <th scope="col" className="px-14 py-4 text-right max-md:p-2">
              الوقت
            </th>
            <th scope="col" className="px-14 py-4 text-right max-md:p-2">
              تفاصيل
            </th>
          </tr>
        </thead>
        <tbody>
          {arrayForTest.map((item, index) => (
            <tr key={index}>
              <td className="px-14 py-4 text-gray-600 text-right max-md:p-2">
                {item.branch}
              </td>
              {trackingInfo?.CurrentStatus?.state === "CANCELLED" ? null : (
                <td className="px-14 py-4 text-gray-600 text-right max-md:p-2">
                  {item.data}
                </td>
              )}

              <td className="px-14 py-4 text-gray-600 text-right max-md:p-2">
                {item.time}
              </td>
              <td className="px-14 py-4 text-gray-600 text-right max-md:p-2">
                {item.details}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackingTable;
