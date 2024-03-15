import { IoSaveOutline, IoCheckmark } from "react-icons/io5";
import { useTrackingContext } from "../Context/TrackingContext";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const { trackingInfo } = useTrackingContext();
  const [statePackage, setStatePackage] = useState("");
  const [colorState, setColorState] = useState("");
  const [steps, setSteps] = useState([]);

  const calculateStateOfPackage = () => {
    if (trackingInfo?.CurrentStatus?.state === "DELIVERED_TO_SENDER") {
      setStatePackage("الشحنة  خرجت للتسليم");
      setColorState("[#F9BA02]");
    } else if (trackingInfo?.CurrentStatus?.state === "DELIVERED") {
      setStatePackage("تم تسليم الشحنة");
      setColorState("green-400");
    } else if (trackingInfo?.CurrentStatus?.state === "CANCELLED") {
      setStatePackage("تم الغاء الشحنة");
      setColorState("red-400");
    } else {
      setStatePackage("");
    }
  };

  useEffect(() => {
    if (trackingInfo) {
      calculateStateOfPackage();

      const updatedSteps = [
        { name: "تم انشاء الشحنة", href: "#", status: "complete" },
        { name: "تم استلام الشحنة من التاجر", href: "#", status: "complete" },
        {
          name: "الشحنة خرجت للتسليم",
          href: "#",
          status:
            trackingInfo?.CurrentStatus?.state === "DELIVERED_TO_SENDER"
              ? "current"
              : "complete",
        },
        {
          name: "تم التسليم",
          href: "#",
          status:
            trackingInfo?.CurrentStatus?.state === "DELIVERED"
              ? "current"
              : "upcoming",
        },
      ];

      setSteps(updatedSteps);
    }
  }, [trackingInfo]);

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <>
      <div className="flex w-[100%] gap-16 items-center max-md:justify-center py-2 px-12 max-md:p-2">
        <span className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">
            رقم الشحنة {trackingInfo?.TrackingNumber}
          </p>
          <h1 className={`text-xl text-${colorState} `}>{statePackage}</h1>
        </span>
        {trackingInfo?.PromisedDate === null ? null : (
          <span className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">موعد التسليم خلال</p>
            <h1 className="text-xl text-black">
              {trackingInfo?.PromisedDate?.substring(0, 10) || ""}
            </h1>
          </span>
        )}
      </div>
      <nav
        aria-label="Progress"
        className="flex items-center justify-center w-[100%]"
      >
        <ol
          role="list"
          className="flex items-center justify-center flex-row-reverse w-[80%] p-2"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pr-16 md:pr-56" : "",
                "relative"
              )}
            >
              {step.status === "complete" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className={`h-1.5 w-full bg-${colorState}`} />
                  </div>
                  <a
                    href="#"
                    className={`relative right-0 flex h-6 w-6 items-center justify-center rounded-full bg-${colorState}`}
                  >
                    <IoCheckmark className="text-white" />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : step.status === "current" ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-gray-100" />
                  </div>
                  <a
                    href="#"
                    className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-${colorState} bg-${colorState}`}
                    aria-current="step"
                  >
                    <IoSaveOutline className="text-white text-2xl" />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-gray-200" />
                  </div>
                  <a
                    href="#"
                    className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white"
                  >
                    <IoSaveOutline className="text-gray-200" />
                    <span className="sr-only">{step.name}</span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
