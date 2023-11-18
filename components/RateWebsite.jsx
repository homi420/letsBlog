"use client";
import { useMyContext } from "@state/MyContext";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const RateWebsite = () => {
  const { data: session } = useSession();
  const [hoveredStarPlatform, setHoveredStarPlatform] = useState();
  const [selectedRatingPlatform, setSelectedRatingPlatform] =
    useState(undefined);
  const { handleAlert } = useMyContext();
  const [review, setReview] = useState("");
  const [show, setShow] = useState(false);
  const handleStarHoverPlatform = (index) => {
    setHoveredStarPlatform(index);
  };
  const handleStarLeavePlatform = () => {
    setHoveredStarPlatform(null);
  };
  const handleStarSelectPlatform = (index) => {
    setSelectedRatingPlatform(index);
  };
  const onReviewChange = (e) => {
    setReview(e.target.value);
  };
  const ratePlatform = async () => {
    const response = await fetch("/api/ratings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        review,
        rating: selectedRatingPlatform,
        user: session?.user.id,
      }),
    });
    const json = await response.json();
    handleAlert(response, json);
    setShow(false);
  };
  useEffect(() => {
    setTimeout(() => {
      const getReviews = async () => {
        const response = await fetch("/api/ratings", {
          method: "GET",
        });
        const json = await response.json();
        const filtered = json.filter(
          (item) => item.user._id.toString() === session?.user.id
        );

        if (filtered.length > 0) {
          return;
        } else {
          setShow(true);
        }
      };
      if (session) getReviews();
    }, 10000);
  }, [session]);

  return (
    <div
      className={`flex flex-col justify-center items-center shadow-md shadow-slate-600 dark:shadow-slate-500 text-white bg-gradient-to-tr from-celestial-blue to-gunmetal gap-1 sm:w-1/2 w-full rounded-lg absolute top-1/4 sm:left-1/4 left-0 py-4 ${
        show === true
          ? "block opacity-100 transition-all"
          : " hidden transition-all opacity-0"
      }`}
    >
      <h3 className="tracking-tight font-montserrat font-semibold mt-4 ">
        Rate Our Platform
      </h3>
      <p className="tracking-widest mb-4 text-center">
        Your reviews can help us enhance our weak points
      </p>
      <div className="flex gap-1 text-2xl mt-4">
        {" "}
        {[1, 2, 3, 4, 5].map((index) => {
          return (
            <span
              className="cursor-pointer"
              key={index}
              onMouseEnter={() => handleStarHoverPlatform(index)}
              onMouseLeave={handleStarLeavePlatform}
              onClick={() => handleStarSelectPlatform(index)}
            >
              {!selectedRatingPlatform ? (
                index <= hoveredStarPlatform ? (
                  <FaStar />
                ) : (
                  <FaRegStar />
                )
              ) : index <= selectedRatingPlatform ? (
                <FaStar />
              ) : (
                <FaRegStar />
              )}
            </span>
          );
        })}
      </div>
      <input
        type="text"
        className={`${
          selectedRatingPlatform
            ? "opacity-100 transition-all static"
            : "absolute opacity-0"
        } p-2 dark:border-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue  w-1/2 my-4`}
        placeholder="Review"
        value={review}
        onChange={onReviewChange}
      />
      <button
        type="button"
        className="white_btn my-4"
        onClick={() => ratePlatform()}
        disabled={review.length < 3 ? true : false}
      >
        Rate
      </button>
      <span
        className="absolute top-4 right-4 cursor-pointer hover:font-bold font-cinzel transition-all"
        onClick={() => setShow(false)}
      >
        X
      </span>
    </div>
  );
};

export default RateWebsite;
