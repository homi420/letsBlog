"use client";
import Content from "@components/BlogPage/Content";
import RelatedBlogs from "@components/BlogPage/RelatedBlogs";
import Divider from "@components/Divider";
import Rate from "@components/Rate";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BlogPage = ({ params }) => {
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [blogToShow, setBlogToShow] = useState(undefined);
  const [filteredBlogs, setFilteredBlogs] = useState();
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      const response = await fetch(`/api/blogs/read/byBlogId/${id}`);
      const json = await response.json();
      setBlogToShow(json);
      setLoading(false);
    };
    if (id) getBlog();
  }, [id]);
  useEffect(() => {
    const getBlogsByField = async () => {
      // setLoading(true);
      const response = await fetch(
        `/api/blogs/read/byFields/${blogToShow.category}/${blogToShow._id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log(json);
      setFilteredBlogs(json);
      // setLoading(false);
    };
    if (blogToShow) getBlogsByField();
  }, [blogToShow]);
  return (
    <>
      <div className="p-4 grid grid-cols-12 md:gap-2 gap-10">
        {!loading ? (
          <>
            <Content blog={blogToShow} />
            <RelatedBlogs blogs={filteredBlogs} />
          </>
        ) : (
          <div>
            <Image src={"/assets/icons/loader.svg"} width={50} height={50} />
          </div>
        )}
      </div>
      {!loading && (
        <>
          <Divider />
          <Rate blogId={id} />
        </>
      )}
    </>
  );
};

export default BlogPage;
