"use client";
import { useMyContext } from "@state/MyContext";
import { getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Hero = ({ img }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { providers } = useMyContext();
  const getStarted = (id) => {
    if (session?.user) {
      router.push("/createBlog");
    } else {
      signIn(id);
    }
  };
  return (
    <section
      className="p-4 grid sm:grid-cols-2 3xs:grid-cols-1 items-center justify-center min-h-[80vh] self-center place-self-center "
      id="Hero"
    >
      <div className="self-center  3xs:text-center">
        <h1 className="heroHeading dark:text-ghost-white ">
          Let's <span className="text-celestial-blue"> Create</span> &{" "}
          <span className="text-celestial-blue"> Share.</span> <br />
          <span className="">
            Lets <span className="text-celestial-blue font-bold">Blog.</span>
          </span>
        </h1>
        <div className="btnGroup my-10 flex 3xs:justify-center sm:justify-start">
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => getStarted(provider.id)}
                  className="btnSp "
                >
                  <span className="text-2xl">Get Started</span>
                </button>
              );
            })}
        </div>
      </div>
      <div className="self-center ">
        <Image
          src={img}
          width={600}
          height={600}
          className="object-contain"
          alt="Laptop"
        />
      </div>
    </section>
  );
};

export default Hero;
