"use client";
import React, { useState } from "react";
import { useMyContext } from "@state/MyContext";

const CategoryDropdown = ({ handleChange, blogInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useMyContext();

  const categories = [
    "Technology",
    "Travel",
    "Food",
    "Fashion",
    "Health",
    "Other",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue"
        onClick={toggleDropdown}
      >
        {selectedCategory}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-1.41 1.41L6 10.83l-1.41-1.42L10 6l4.41 4.41L14 10.83l-2.58-2.58L10 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => selectCategory(category)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}
      {selectedCategory === "Other" ? (
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category Here..."
          className="my-2 p-2   dark:border-0 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue"
          required
          value={blogInput.category}
          onChange={handleChange}
        />
      ) : null}
    </div>
  );
};
export default CategoryDropdown;
