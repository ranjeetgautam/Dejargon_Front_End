"use client";

import Image from "next/image";
import React from "react";
import Logo from "@public/Logo.png";

const Header = () => {
  return (
    <header className="w-full h-20 flex items-center justify-between px-16 shadow-sm border-b-2 border-slate-200">
      {/* Logo */}
      <a
        href="/"
        className="text-[#001A47] text-2xl font-extrabold tracking-tight"
      >
        <Image src={Logo} alt="Logo" width={143.26} height={36} />
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-10 text-[#0F172A] font-medium">
        <a href="/about-us" className="hover:text-[#001A47] transition">
          About Us
        </a>
        <a
          className="hover:text-[#001A47] transition"
          onClick={() =>
            document
              .getElementById("pricing")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Pricing
        </a>
      </nav>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="border-2 border-tertiary text-tertiary font-semibold px-6 py-2 rounded-full hover:bg-tertiary hover:text-white transition">
          Login
        </button>
        <button className="bg-tertiary text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition">
          Get started
        </button>
      </div>
    </header>
  );
};

export default Header;
