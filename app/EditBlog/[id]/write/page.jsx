"use client";

import MyEditor from "@components/MyEditor";
import { useMyContext } from "@state/MyContext";
import React from "react";

const Write = () => {
  const { updateBlog, isPosting } = useMyContext();

  return (
    <div className="p-4">
      <MyEditor />
      <div className="my-4 flex justify-end">
        <button
          type="button"
          className="blue_btn"
          disabled={isPosting}
          onClick={updateBlog}
        >
          {isPosting ? "Update..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default Write;
