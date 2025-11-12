"use client";

import React from "react";

const SegmentedTabs = ({ tabs = [], selected, setSelected }) => {
  return (
    <div className="flex rounded-xl overflow-hidden shadow-md bg-gradient-to-b from-[#F8F5EE] to-[#E8E1D0]">
      {tabs.map((tab, index) => {
        const isActive = selected === tab.value;
        return (
          <React.Fragment key={tab.value}>
            <button
              onClick={() => setSelected(tab.value)}
              className={`flex-1 px-8 py-3 text-lg font-medium transition-colors ${
                isActive
                  ? "bg-[#001A47] text-white"
                  : "text-black hover:bg-[#f3ecdc]"
              } ${index === 0 ? "rounded-l-xl" : ""} ${
                index === tabs.length - 1 ? "rounded-r-xl" : ""
              }`}
            >
              {tab.label}
            </button>

            {/* Divider Line */}
            {index !== tabs.length - 1 && (
              <div className="w-px bg-[#9C8B57]/50 my-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SegmentedTabs;
