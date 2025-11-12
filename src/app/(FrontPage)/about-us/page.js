"use client";

import CommonButton from "@/components/Button/CommonButton";
import React, { useEffect } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ProgressBar from "@/components/ProgressBar/ProgressBar";


function About() {
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
        <ProgressBar stages={stages} />
      </div>
    </div>
  );
}

export default About;
