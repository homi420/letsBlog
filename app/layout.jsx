import React from "react";
import "@styles/globals.css";
import Provider from "@components/Provider";
import MyMain from "@components/MyMain";
import Providers from "@components/Providers";

export const metadata = {
  title: "Lets Blog | Create & Share",
  description:
    "Explore Lets Blog, where we bring you engaging and informative content. Discover a wide range of topics, from Technology to Biology. Join our community and stay updated with the latest insights, tips, and trends. Your go-to destination for Lets Blog.",
};
const RootLayout = ({ children }) => {
  return (
    <Provider>
      <html lang="en">
        <body>
          <main className="app">
            <Providers />
            <MyMain>{children}</MyMain>
          </main>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
