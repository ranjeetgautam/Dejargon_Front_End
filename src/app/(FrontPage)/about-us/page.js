"use client";

import CommonButton from "@/components/Button/CommonButton";
import React, { useEffect, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Pagination from "@/components/Pagination/Pagination";
import SegmentedTabs from "@/components/SegmentedTab/SegmentedTab";

function About() {
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState("overview");
  const tabs = [
    { label: "Analysis Overview", value: "overview" },
    { label: "Clause Analysis", value: "clause" },
    { label: "Obligations", value: "obligations" },
  ];
  const total = 12;
  const stages = [
    {
      name: "Start",
      icon: <AutoAwesomeIcon fontSize="medium" />,
      completed: true,
    },
    {
      name: "Profile",
      icon: <PersonIcon fontSize="medium" />,
      completed: false,
    },
    {
      name: "Finish",
      icon: <EmojiEventsIcon fontSize="medium" />,
      completed: false,
    },
  ];
  return (
    <div className="p-10 min-h-screen flex items-center justify-center">
      <div className="w-3/4">
        <SegmentedTabs
          tabs={tabs}
          selected={selected}
          setSelected={setSelected}
        />
        <Pagination total={total} current={current} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

export default About;
