"use client";
import Form from "@components/Form";
import { useMyContext } from "@state/MyContext";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditBlog = ({ params }) => {
  const blogId = params.id;
  const {
    setSelectedCategory,
    setBlogInput,
    setBlogToUpdate,
    setType,
    blogInput,
  } = useMyContext();

  useEffect(() => {
    const getBlogDetails = async () => {
      const response = await fetch(`/api/blogs/read/byBlogId/${blogId}`, {
        method: "GET",
        headers: {
          Accept: " */*",
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      setSelectedCategory(json.category);
      setBlogInput(json);
    };
    if (blogId) {
      getBlogDetails();
      setBlogToUpdate(blogId);
      setType("edit");
    }
  }, [blogId]);

  return (
    <div className="p-4">
      <h1 className="text-center text-celestial-blue">
        <span className="dark:text-ghost-white text-gunmetal">Edit</span> Blog
      </h1>
      <Form type="edit" id={blogId} />
    </div>
  );
};

export default EditBlog;
