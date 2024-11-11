import React from "react";
import { LuPhoneCall } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";

const PropertyCard = ({ tag }) => {
  return (
    <div className="relative min-w-[300px] border border-borderIndlay rounded-[20px] overflow-hidden shadow-md">
      {tag !== "" && (
        <span className="absolute top-3 left-4 text-sm bg-green-300 px-2 border border-green-800 rounded-xl">
          {tag}
        </span>
      )}
      <div className="h-[150px] w-full bg-black" />
      <div className="px-4 pb-5">
        <h3 className="text-base font-medium font-banana mt-3">
          Solitaire Industrial Park
        </h3>
        <h6 className="text-xs font-normal font-banana text-indlay mt-1">
          Solitaire Industrial Park
        </h6>
        <div className="grid grid-cols-2 gap-5 mt-4">
          <span className="text-indlay text-xs font-normal font-banana">
            Truck
          </span>
          <span className="text-indlay text-xs font-normal font-banana">
            Truck
          </span>
          <span className="text-indlay text-xs font-normal font-banana">
            Truck
          </span>
          <span className="text-indlay text-xs font-normal font-banana">
            Truck
          </span>
        </div>
        {/* <hr className="w-10/12 bg-indlay my-4" />
        <div className="py-5 grid grid-cols-2 gap-3">
          <button className="col-span-1 flex items-center justify-center py-2 rounded-[70px] border border-ctaDarker bg-ctaDarker text-white font-normal text-sm">
            <IoMdAdd />
            &nbsp;&nbsp;&nbsp;Compare
          </button>
          <button className="col-span-1 flex items-center justify-center py-2 rounded-[70px] border border-indlay">
            <LuPhoneCall />
            &nbsp;&nbsp;&nbsp;Book a visit
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default PropertyCard;
