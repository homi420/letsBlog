"use client";
import BlogCard from "@components/BlogCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setSearchText(searchQuery);
    const filteredPosts = blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFiltered(filteredPosts);
  };
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const response = await fetch("/api/blogs", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      setBlogs(json);
      setFiltered(json);
      setLoading(false);
    };
    getBlogs();
  }, []);
  return (
    <div className="p-4">
      <section className="flex justify-center flex-col">
        <h1 className="text-center font-semibold">
          <span className="text-celestial-blue"> Find</span> Your{" "}
          <span className="text-celestial-blue">Favorite</span>
          <br /> Blog
        </h1>
        <input
          type="search"
          className="p-2 dark:border-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue self-center w-1/2 my-10"
          placeholder="Search by category or title"
          name="searchBox"
          onChange={handleChange}
        />
      </section>
      {!loading ? (
        <section className="cardSection">
          {filtered.length !== 0 ? (
            filtered.map((blog) => {
              return <BlogCard key={blog._id} blog={blog} type="feed" />;
            })
          ) : (
            <p>No Blogs To Display...</p>
          )}
        </section>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={"/assets/icons/loader.svg"}
            width={50}
            height={50}
            alt="Loader"
          />
        </div>
      )}
    </div>
  );
};

export default Blogs;
