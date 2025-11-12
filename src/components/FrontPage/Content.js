"use client";
import BoltIcon from "@mui/icons-material/Bolt";
import ContentImg from "@public/frontPage/content.png";
import Image from "next/image";

function Content() {
  return (
    <main>
      <div className="flex flex-col p-5 justify-center items-center">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary leading-snug max-w-[63rem] ">
          <span className="text-[#1F79FF]">Fast</span> reviews.
          <span className="text-[#1F79FF]">Zero</span> confusion.
          <span className="text-[#1F79FF]">Minimal</span> risk.
        </p>
        <div className="flex grid-cols-3">
          <div className="flex shadow-lg bg-secondary max-h-16 max-w-xs items-center px-3 py-1">
            <div className="p-2 ">
              <BoltIcon className="text-lg border-r-2 border-r-slate-600" />
            </div>
            <div>
              <p className="text-gray-800 text-base">
                <span className="font-semibold">Instant Clarity </span>
                Every clause rewritten in plain, human language.
              </p>
            </div>
          </div>
          <div>
            <Image
              src={ContentImg}
              alt={"Content"}
              className="w-[361.09px] h-[360px]"
            />
          </div>
          <div>3</div>
        </div>
      </div>
    </main>
  );
}

export default Content;
//
