import { ThemeProvider } from "next-themes";
import React from "react";

const ProvidersTheme = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ProvidersTheme;
