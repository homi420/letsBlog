import BlogCard from "@components/BlogCard";
import React from "react";

const RelatedBlogs = ({ blogs }) => {
  return (
    <div className="md:col-span-4 col-span-12">
      <h6 className="my-4 text-2xl">Related Blogs</h6>
      <div className="">
        {blogs?.map((blog) => {
          return <BlogCard blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default RelatedBlogs;
