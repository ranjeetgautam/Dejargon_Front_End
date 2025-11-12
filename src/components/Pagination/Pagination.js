"use client";

import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({ total = 1, current = 1, setCurrent }) => {
  const handlePrev = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current < total) setCurrent(current + 1);
  };

  return (
    <div className="flex items-center justify-center gap-40 py-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        disabled={current === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
          current === 1
            ? "bg-tertiary/30 cursor-not-allowed"
            : "bg-tertiary hover:bg-[#002766]"
        }`}
      >
        <ChevronLeftIcon style={{ color: "white", fontSize: "2.5rem" }} />
      </button>

      {/* Counter */}
      <div className="px-8 py-4 rounded-lg bg-gradient-to-b from-[#F4EDDD] to-[#E8E1D0] shadow-inner">
        <span className="text-lg font-semibold text-black">
          {current}/{total}
        </span>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        disabled={current === total}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
          current === total
            ? "bg-tertiary/30 cursor-not-allowed"
            : "bg-tertiary hover:bg-[#002766]"
        }`}
      >
        <ChevronRightIcon style={{ color: "white", fontSize: "2.5rem" }} />
      </button>
    </div>
  );
};

export default Pagination;
