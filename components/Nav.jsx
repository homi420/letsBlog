"use client";
import Image from "next/image";
import DarkModeBtn from "@components/DarkModeBtn";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMyContext } from "@state/MyContext";

const Nav = () => {
  const { data: session } = useSession();
  const { providers } = useMyContext();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();
  return (
    <header className={`flex flex-between w-full mb-16 py-3 px-2`}>
      <Link href={"/"} className="flex flex-center">
        <FaPen className="text-xl mx-1" />

        <p className=" logo_text ">Lets Blog</p>
      </Link>
      {/* Desktop Navigation */}
      <nav className="sm:flex hidden ">
        {session?.user ? (
          <div className="flex gap-3 flex-center">
            <DarkModeBtn />

            <Link href={"/createBlog"} className="blue_btn ">
              Create Blog
            </Link>
            <Link href={"/blogs"} className="blue_btn ">
              View Blogs
            </Link>
            <button className={`black_btn`} type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session.user.image.toString()}
                width={30}
                height={30}
                alt="Profile Pic"
                className="cursor-pointer rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <DarkModeBtn />
            <Link href={"/blogs"} className="blue_btn ">
              View Blogs
            </Link>

            {(providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))) || (
              <Image
                width={50}
                height={50}
                alt="loader"
                src={"/assets/icons/loader.svg"}
              />
            )}
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/blogs"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  View Blogs
                </Link>
                <Link
                  href="/createBlog"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Blog
                </Link>
                <DarkModeBtn />

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {(providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.id}>
                  <DarkModeBtn />

                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </div>
              ))) || (
              <Image
                width={50}
                height={50}
                src={"/assets/icons/loader.svg"}
                alt="loader"
              />
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
