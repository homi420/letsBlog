"use client";
import { useMyContext } from "@state/MyContext";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rate = ({ blogId }) => {
  const { data: session } = useSession();
  const [hoveredStar, setHoveredStar] = useState();
  const [selectedRating, setSelectedRating] = useState(undefined);
  const { handleAlert } = useMyContext();
  const handleStarHover = (index) => {
    setHoveredStar(index);
  };
  const handleStarLeave = () => {
    setHoveredStar(null);
  };
  const handleStarSelect = (index) => {
    setSelectedRating(index);
  };
  const rateBlog = async (blogId) => {
    if (selectedRating) {
      const response = await fetch(`/api/blogs/rating/${blogId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          rating: selectedRating,
          rater: session?.user.id,
        }),
      });
      const json = await response.json();
      handleAlert(response, json);
    } else {
      alert("Please Select Rating");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center my-10 gap-4">
      <span className="text-xl">Rate This Blog</span>
      <div className="flex gap-1 text-2xl">
        {" "}
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <span
              className="cursor-pointer"
              key={index}
              onMouseEnter={() => handleStarHover(index)}
              onMouseLeave={handleStarLeave}
              onClick={() => handleStarSelect(index)}
            >
              {!selectedRating ? (
                index <= hoveredStar ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )
              ) : index <= selectedRating ? (
                <FaStar />
              ) : (
                <FaRegStar />
              )}
            </span>
          );
        })}
      </div>
      <button type="button" className="btnSp" onClick={() => rateBlog(blogId)}>
        Rate
      </button>
    </div>
  );
};

export default Rate;
