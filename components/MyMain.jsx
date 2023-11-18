"use client";
import React from "react";
import Nav from "@components/Nav";
import ProvidersTheme from "@components/ProvidersTheme";
import { MyContextProvider } from "@state/MyContext";
import MyAlert from "@components/MyAlert";
import RateWebsite from "@components/RateWebsite";
const MyMain = ({ children }) => {
  return (
    <MyContextProvider>
      <ProvidersTheme>
        <Nav />
        <MyAlert />
        <RateWebsite />
        {children}
      </ProvidersTheme>
    </MyContextProvider>
  );
};

export default MyMain;
