"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/header";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";

const FrontLayout = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Run only in the browser
    if (typeof window !== "undefined") {
      const loaderState = localStorage.getItem("loader");
      if (loaderState === "true") {
        setShowLoader(true);
      }
    }
  }, []);

  return (
    <div className=" h-full overflow-y-auto ">
      {showLoader ? (
        <Loader />
      ) : (
        <>
          {" "}
          <Header />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default FrontLayout;
