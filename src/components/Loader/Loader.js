import React, { useEffect, useState } from "react";

const Loader = ({ message = "Loading..." }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in shortly after mount
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-row gap-7 items-center justify-center bg-primary z-50
        transition-opacity duration-700 ease-in-out
        ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-t-transparent border-tertiary"></div>
      <p className="text-tertiary text-2xl font-medium">{message}</p>
    </div>
  );
};

export default Loader;
