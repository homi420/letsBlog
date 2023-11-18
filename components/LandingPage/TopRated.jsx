"use client";
import BlogCard from "@components/BlogCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TopRated = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const response = await fetch("/api/blogs");
      const json = await response.json();
      console.log(json);
      const sortedJson = json.sort((a, b) => b.avgRating - a.avgRating);
      const topRated = sortedJson.slice(0, 2);
      setBlogs(topRated);
      setLoading(false);
    };
    getBlogs();
  }, []);
  return (
    <section className="p-4 my-48">
      <h3>Top Rated Blogs</h3>
      <div className="grid grid-cols-2 gap-4 my-12">
        {!loading ? (
          blogs.map((blog) => {
            return <BlogCard key={blog._id} blog={blog} />;
          })
        ) : (
          <>
            <Image
              alt="loader"
              src={"/assets/icons/loader.svg"}
              width={50}
              height={50}
            />
            <Image
              alt="loader"
              src={"/assets/icons/loader.svg"}
              width={50}
              height={50}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default TopRated;
