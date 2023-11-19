import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit, FaStar, FaTrash } from "react-icons/fa";

const BlogCard = ({ blog, type = "feed", handleDelete, handleEdit }) => {
  console.log(blog);
  return (
    <div className="dark:border-gunmetal border-teal-100 border rounded sm:col-auto 3xs:col-span-12 cursor-pointer shadow-md hover:shadow-lg  transition-shadow dark:shadow-black self-start ">
      <div className="flex items-center gap-2 dark:border-gunmetal border-teal-100  border-b p-2">
        <Image
          width={40}
          height={40}
          className="object-contain rounded-full"
          src={blog.user.image}
          alt="profilePic"
        />
        {type === "feed" ? (
          <p className="text-gray-500">@{blog.user.userName}</p>
        ) : type === "profile" ? (
          <div className="flex gap-2 justify-end   flex-1">
            <FaEdit
              className="text-green-500 hover:text-green-700 transition-colors"
              onClick={() => handleEdit(blog._id)}
            />
            <FaTrash
              className="text-red-500 hover:text-red-700 transition-colors"
              onClick={() => handleDelete(blog._id)}
            />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col p-2 font-semibold">
        <p>{blog.title}</p>
      </div>
      <div className="flex flex-col p-2 font-medium">
        <p>{blog.description}</p>
      </div>
      <p className="m-2  flex items-center gap-1">
        Rating:{" "}
        <span className=" text-celestial-blue flex items-center gap-1">
          {blog.avgRating} <FaStar />
        </span>
      </p>
      <div className="flex justify-between items-end mt-3">
        <p className="text-gray-500 p-2"> {blog.category}</p>
        <Link className="btnSp mx-1 my-2" href={`/blogs/${blog._id}`}>
          View Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
