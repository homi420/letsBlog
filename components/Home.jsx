"use client";
import React, { useEffect, useState } from "react";
import Hero from "./LandingPage/Hero";
import Steps from "./LandingPage/Steps";
import Environment from "./LandingPage/Environment";
import Testimonials from "./LandingPage/Testimonials";
import CTA from "./CTA";
import Divider from "./Divider";
import TopRated from "./LandingPage/TopRated";
import Image from "next/image";
import { useMyContext } from "@state/MyContext";
import Footer from "./Footer";

const Home = () => {
  const { providers } = useMyContext();
  return (
    (providers && (
      <>
        <Hero img="/assets/images/animated.svg" />
        <Steps />
        <Environment img="/assets/images/Blogging-bro.png" />
        <TopRated />
        <Testimonials />
        <Divider />
        <CTA />
        <Footer />
      </>
    )) || (
      <div className="flex items-center justify-center">
        <Image src={"/assets/icons/loader.svg"} width={50} height={50} />
      </div>
    )
  );
};

export default Home;
