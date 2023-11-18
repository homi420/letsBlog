import { useMyContext } from "@state/MyContext";
import React from "react";

const MyAlert = () => {
  const { showAlert } = useMyContext();
  return (
    <div
      className={`fixed top-1/2 left-1/2 ${
        showAlert.bg === true ? "bg-green-700" : "bg-red-700"
      }  p-4 ${showAlert.show ? "block " : "hidden"} rounded z-30  `}
    >
      <p className="text-white">{showAlert.message}</p>
    </div>
  );
};

export default MyAlert;
