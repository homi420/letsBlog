"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key={filledStars} style={{ opacity: 0.5 }} />);
    }
    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={filledStars + (hasHalfStar ? 1 : 0) + i} />);
    }
    return stars;
  };

  return (
    <div
      className="dark:text-gunmetal text-ghost-white flex
  "
    >
      {renderStars()}
    </div>
  );
};
const MySlider = ({ items }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: Math.min(3, items.length),
    responsive: [
      {
        breakpoint: 1024, // screensize >= 1024px
        settings: {
          slidesToShow: Math.min(3, items.length),
        },
      },
      {
        breakpoint: 768, // screensize >= 768px
        settings: {
          slidesToShow: Math.min(2, items.length),
        },
      },
      {
        breakpoint: 480, // screensize >= 480px
        settings: {
          slidesToShow: Math.min(1, items.length),
        },
      },
    ],
  };
  return (
    <Slider {...settings} style={{ maxWidth: "100%", overflow: "hidden" }}>
      {items.map((item) => {
        return (
          <TestimonialCards
            key={item._id}
            userName={item.user.userName}
            image={item.user.image}
            review={item.review}
            rating={item.rating}
          />
        );
      })}
    </Slider>
  );
};
const TestimonialCards = ({ userName, image, review, rating }) => {
  return (
    <div className="my-10 rounded bg-gunmetal dark:bg-ghost-white   items-center p-4 shadow-black shadow-md dark:shadow-celestial-blue  mx-2">
      <div className="flex items-center gap-2">
        <Image width={50} height={50} src={image} className="rounded-full" />
        <h6 className="text-celestial-blue ">@{userName}</h6>
      </div>
      <p className="my-5 text-ghost-white dark:text-gunmetal">{review}</p>
      <RatingStars rating={rating} />
    </div>
  );
};
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch("/api/ratings", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setReviews(json);
    };
    getReviews();
  }, []);

  return (
    <section className="p-4">
      <h3>Testimonials</h3>
      <MySlider items={reviews} />
    </section>
  );
};

export default Testimonials;
