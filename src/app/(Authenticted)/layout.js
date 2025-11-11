"use client";

import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100">{children}</div>
  );
};

export default AuthLayout;
