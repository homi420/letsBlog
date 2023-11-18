import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <div className="flex items-center justify-center p-2 bg-gunmetal text-white">
      &copy; {date.getFullYear()}. All Rights Reserved
    </div>
  );
};

export default Footer;
