"use client";

import CommonButton from "@/components/Button/CommonButton";
import React, { useEffect, useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Pagination from "@/components/Pagination/Pagination";

function About() {
  const [current, setCurrent] = useState(1);
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
        <Pagination total={total} current={current} setCurrent={setCurrent} />
      </div>
    </div>
  );
}

export default About;
