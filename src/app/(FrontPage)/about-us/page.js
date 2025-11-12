"use client";

import CommonButton from "@/components/Button/CommonButton";
import React, { useEffect } from "react";

function About() {
  return (
    <div>
      About Page{" "}
      <div>
        <CommonButton isCancelBtn isPending={true} />
      </div>
    </div>
  );
}

export default About;
