"use client";
import Form from "@components/Form";
import PLF from "@components/PLF";
import { useMyContext } from "@state/MyContext";
import { useSession } from "next-auth/react";

import React, { useEffect } from "react";

const CreateBlog = () => {
  const { data: session } = useSession();
  const { setType, setBlogInput } = useMyContext();

  useEffect(() => {
    setType("add");
    setBlogInput({
      title: "",
      description: "",
      category: "",
    });
  }, []);
  return (
    (session && (
      <div className="p-4">
        <h1 className="text-center text-celestial-blue">
          <span className="dark:text-ghost-white text-gunmetal">Create</span>{" "}
          Blog
        </h1>
        <Form type="add" />
      </div>
    )) || <PLF />
  );
};

export default CreateBlog;
