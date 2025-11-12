"use client";

import React from "react";

const ProgressBar = ({ stages = [] }) => {
  const completedCount = stages.filter((s) => s.completed).length;
  const progressPercent =
    stages.length > 1
      ? (completedCount / stages.length) * 100
      : completedCount > 0
      ? 100
      : 0;

  return (
    <div className="relative w-full">
      {/* --- Progress Line (Base) --- */}
      <div className="absolute top-1/2 left-0 w-full h-2 bg-[#ECE5D8] rounded-full transform -translate-y-1/2 shadow-md" />

      {/* --- Filled Progress --- */}
      <div
        className="absolute top-1/2 left-0 h-2 bg-[#001A47] rounded-full transform -translate-y-1/2 shadow-md transition-all duration-700"
        style={{ width: `${progressPercent}%` }}
      />

      {/* --- Moving Circle --- */}
      <div
        className="absolute top-1/2 h-5 w-5 bg-[#001A47] rounded-full border-2 border-white shadow-md transform -translate-y-1/2 transition-all duration-700"
        style={{
          left: `calc(${progressPercent}% - 10px)`, // centers circle at progress end
        }}
      ></div>

      {/* --- Icons + Labels --- */}
      <div className="relative flex justify-between items-center">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-row gap-3 items-center mb-24">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${
                stage.completed ? "bg-[#001A47]" : "bg-tertiary"
              }`}
            >
              <div
                className={`${stage.completed ? "text-white" : "text-white"}`}
              >
                {stage.icon}
              </div>
            </div>
            <span className="text-lg font-mono font-semibold text-black">
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
