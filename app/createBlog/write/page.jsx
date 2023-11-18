"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMyContext } from "@state/MyContext";
import { useSession } from "next-auth/react";
import PLF from "@components/PLF";

// import MyEditor from "./MyEditor";
const MyEditor = dynamic(() => import("@/components/MyEditor"), {
  ssr: false,
});
const Write = () => {
  const { data: session } = useSession();
  const { createBlog, isPosting } = useMyContext();

  return (
    (session && (
      <div className="p-4">
        <MyEditor />
        <div className="my-4 flex justify-end">
          <button
            type="button"
            className="blue_btn"
            disabled={isPosting}
            onClick={createBlog}
          >
            {isPosting ? "Post..." : "Post"}
          </button>
        </div>
      </div>
    )) || <PLF />
  );
};

export default Write;
