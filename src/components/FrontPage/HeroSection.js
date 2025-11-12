"use client";

import Image from "next/image";
import HeroImg from "@public/frontPage/heroSection.png";
import UploadDocument from "../UploadDocument/UploadDocument";

function HeroSection() {
  return (
    <main className="w-full bg-primary py-6 px-16 ">
      <div className="container mx-auto  py-16 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 items-center">
        {/* Left Text Section */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-6 md:pr-10">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary leading-snug">
            Would You Sign{" "}
            <span className="text-[#1F79FF]">Without Knowing</span> the Risks?
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-[42rem] mx-auto md:mx-0">
            Upload any agreement and instantly see what’s good, what’s risky,
            and how to fix it — before you commit.
          </p>

          <div className="w-full md:w-[85%] lg:w-[80%] mx-auto md:mx-0 mt-20">
            <UploadDocument />
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center md:justify-center">
          <Image
            src={HeroImg}
            alt="Hero section illustration"
            className="w-60 sm:w-72 md:w-80 lg:w-[360px] h-auto object-contain"
            priority
          />
        </div>
      </div>
    </main>
  );
}

export default HeroSection;
