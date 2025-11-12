"use client";
import BoltIcon from "@mui/icons-material/Bolt";
import ContentImg from "@public/frontPage/content.png";
import Image from "next/image";
import icon1 from "@public/icons/content1.png";
import icon2 from "@public/icons/content2.png";
import icon3 from "@public/icons/content3.png";
import icon4 from "@public/icons/content4.png";
import icon5 from "@public/icons/content5.png";

export default function Content() {
  /* FeatureCard component */
  function FeatureCard({ icon, title, desc }) {
    return (
      <div className="flex items-center gap-4 bg-secondary shadow-md rounded-lg p-4 w-full max-w-[316px] min-h-[94px]">
        <div className="flex-shrink-0 w-[43px] h-[43px] flex items-center justify-center border-r border-slate-300 pr-3">
          <Image
            src={icon}
            alt="Feature Icon"
            width={43}
            height={43}
            className="object-contain"
          />
        </div>
        <p className="text-gray-800 text-sm sm:text-base leading-snug text-left">
          <span className="font-semibold">{title}</span> — {desc}
        </p>
      </div>
    );
  }
  //

  return (
    <main className="w-full  py-20 bg-white ">
      <div className="flex flex-col items-center text-center px-4 ">
        {/* Headline */}
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary leading-snug max-w-[63rem] mb-14">
          <span className="text-[#1F79FF]">Fast</span> reviews.{" "}
          <span className="text-[#1F79FF]">Zero</span> confusion.{" "}
          <span className="text-[#1F79FF]">Minimal</span> risk.
        </p>

        {/* Main Layout */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-center w-full max-w-[1200px] mx-auto">
          {/* LEFT COLUMN — aligned to left corner */}
          <div className="flex flex-col items-start justify-center gap-10">
            {/* 1️⃣ Card 1 - Normal */}
            <FeatureCard
              icon={icon1}
              title="Instant Clarity"
              desc="Every clause rewritten in plain, human language."
            />

            {/* 2️⃣ Card 2 - Shifted Left */}
            <div className="-translate-x-7 md:-translate-x-8">
              <FeatureCard
                icon={icon2}
                title="Smart Scoring"
                desc="Know exactly how risky your contract is (0–100)."
              />
            </div>

            {/* 3️⃣ Card 3 - Normal */}
            <FeatureCard
              icon={icon3}
              title="Actionable Advice"
              desc="Get negotiation tips and safer alternatives."
            />
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center">
            <Image
              src={ContentImg}
              alt="Contract Review Preview"
              className="w-[260px] sm:w-[300px] md:w-[360px] h-auto"
              priority
            />
          </div>

          {/* RIGHT COLUMN — aligned to right corner */}
          <div className="flex flex-col items-end gap-10 md:pr-0">
            <FeatureCard
              icon={icon4}
              title="Private & Secure"
              desc="Your contracts stay encrypted, always."
            />
            <FeatureCard
              icon={icon5}
              title="Insights"
              desc="See obligations, hidden fees, and lock-ins at a glance."
            />
          </div>
        </div>
      </div>
    </main>
  );
}
