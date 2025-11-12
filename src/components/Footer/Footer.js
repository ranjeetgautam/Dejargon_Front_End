"use client";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CommonButton from "../Button/CommonButton";

export default function Footer() {
  return (
    <main className="bg-tertiary text-white px-6 sm:px-10 lg:px-16 py-8">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20 pb-10 md:pb-20">
        {/* Left Section */}
        <div className="flex flex-col justify-between gap-5 max-w-3xl text-center md:text-left">
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Ready to simplify your contracts?
          </p>
          <div className="flex justify-center md:justify-start">
            <CommonButton
              btnText="Try DeJargon Now"
              postFix={<ArrowForwardIcon />}
              isCancelBtn="true"
              className="max-w-[242px] hover:bg-white hover:text-tertiary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row md:flex-col items-center md:items-end gap-3 text-center md:text-right">
          <a
            href="/"
            className="  transition text-base sm:text-lg lg:text-xl flex items-center gap-1"
          >
            Home <ArrowOutwardIcon fontSize="small" />
          </a>
          <a
            className="  transition text-base sm:text-lg lg:text-xl flex items-center gap-1"
            onClick={() =>
              document
                .getElementById("pricing")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Pricing <ArrowOutwardIcon fontSize="small" />
          </a>
          <a
            href="mailto:support@dejargon.com"
            className="  transition text-base sm:text-lg lg:text-xl flex items-center gap-1"
          >
            Email Us <ArrowOutwardIcon fontSize="small" />
          </a>
          <a
            href="/privacy"
            className="  transition text-base sm:text-lg lg:text-xl flex items-center gap-1"
          >
            Privacy Policy <ArrowOutwardIcon fontSize="small" />
          </a>
          <a
            href="/terms"
            className="  transition text-base sm:text-lg lg:text-xl flex items-center gap-1"
          >
            Terms of Use <ArrowOutwardIcon fontSize="small" />
          </a>
        </div>
      </div>

      {/* Bottom Border */}
      <p className="border-t-2 border-slate-600 pt-4 text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()} DeJargon • All Rights Reserved
      </p>
    </main>
  );
}
