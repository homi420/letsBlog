"use client";
import BlogCard from "@components/BlogCard";
import PLF from "@components/PLF";
import { useMyContext } from "@state/MyContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const { handleAlert } = useMyContext();
  const [changeInBlogs, setChangeInBlogs] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleEdit = (id) => {
    router.push(`/EditBlog/${id}`);
  };
  const handleDelete = async (id) => {
    const response = await fetch(`/api/blogs/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: session?.user?.id }),
    });
    if (response.ok) {
      setChangeInBlogs(true);
    }
    const json = await response.json();
    handleAlert(response, json);
  };

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const response = await fetch(`/api/blogs/read/${session?.user?.id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      setBlogs(json);
      console.log(json);
      setChangeInBlogs(false);
      setLoading(false);
    };
    if (session) getBlogs();
  }, [session, changeInBlogs]);
  return (
    (session && (
      <div className="p-6">
        <div className="my-4">
          <h3 className="font-medium font-montserrat">My Blogs</h3>
        </div>
        {!loading ? (
          <section className="cardSection">
            {blogs.length !== 0 ? (
              blogs.map((blog) => {
                return (
                  <BlogCard
                    blog={blog}
                    type="profile"
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })
            ) : (
              <p>No Blogs To Display...</p>
            )}
          </section>
        ) : (
          <div>
            <Image
              src={"/assets/icons/loader.svg"}
              width={50}
              height={50}
              alt="Loader"
            />
          </div>
        )}
      </div>
    )) || <PLF />
  );
};

export default Profile;
