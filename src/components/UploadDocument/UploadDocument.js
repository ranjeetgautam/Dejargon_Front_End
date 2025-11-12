"use client";

import { useState } from "react";
import Loader from "../Loader/Loader";
// import { FaLock } from "react-icons/fa";

export default function UploadDocument() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      selected.type === "application/pdf" &&
      selected.size <= 5 * 1024 * 1024
    ) {
      setFile(selected);
    } else {
      alert("Please upload a PDF file under 5MB.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (
      dropped &&
      dropped.type === "application/pdf" &&
      dropped.size <= 5 * 1024 * 1024
    ) {
      setFile(dropped);
    } else {
      alert("Please upload a valid PDF file under 5MB.");
    }
  };

  return (
    <div
      className="border border-dashed border-[#001A47]/30 rounded-2xl px-16 py-8 text-center max-w-xl mx-auto bg-[#001A47]/5 hover:bg-[#001A47]/10 transition cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="text-gray-600 mb-4">
        Drop your resume here or choose a file. <br />
        <span className="font-medium">PDF only. Max 5MB file size.</span>
      </p>

      <label className="inline-block">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="bg-[#001A47] text-white rounded-full px-8 py-3 text-lg font-medium hover:opacity-90 transition">
          Upload your Document
        </div>
      </label>

      <div className="flex justify-center items-center mt-4 text-gray-600">
        {/* <FaLock className="text-green-600 mr-2" /> */}
        <span className="font-medium">Privacy assured</span>
      </div>

      {file && (
        <p className="mt-3 text-sm text-gray-700">
          ✅ {file.name} uploaded successfully
        </p>
      )}
    </div>
  );
}
