"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Environment = ({ img }) => {
  return (
    <section className="grid sm:grid-cols-2 3xs:grid-cols-1 my-48 p-4 items-center">
      <div>
        <Image
          alt="environment"
          src={img}
          width={600}
          height={600}
          className="object-contain"
        />
      </div>
      <div>
        <h3>Environment</h3>
        <p className="my-4 leading-loose">
          Our environment caters to beginners, offering an advantageous platform
          for writers. With its user-friendly interface and the added benefit of
          a dark mode, it is particularly helpful for those who face challenges
          with prolonged screen exposure. The simplicity of our rich text editor
          ensures a seamless blogging experience. Rest assured, choosing us is a
          decision you will never regret.
        </p>
        <button className="my-6" type="button">
          <Link className="blue_btn   " href={"/createBlog"}>
            Check it out
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Environment;
