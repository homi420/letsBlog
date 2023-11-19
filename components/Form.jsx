"use client";
import CategoryDropdown from "./CategoryDropdown";
import { useMyContext } from "@state/MyContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Form = ({ type, id }) => {
  const router = useRouter();
  const { selectedCategory, blogInput, setBlogInput } = useMyContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (e) => {
    setBlogInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (
      selectedCategory === "Select a category" ||
      blogInput.title === "" ||
      blogInput.description === "" ||
      (selectedCategory === "Other" && blogInput.category === "")
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedCategory, blogInput]);
  const nextStep = () => {
    setIsLoading(true);
    if (type === "add") router.push("/createBlog/write");
    else {
      router.push(`/EditBlog/${id}/write`);
    }
    setIsLoading(false);
  };
  return (
    <form className="my-10 grid sm:grid-cols-2 grid-cols-1 gap-4">
      <div className="formGroup col-span-1">
        <label htmlFor="title" className="text-xl ">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title Here..."
          className="p-2 dark:border-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue"
          required
          value={blogInput.title}
          onChange={handleChange}
        />
      </div>

      <div className="formGroup col-span-1">
        <label htmlFor="category" className="text-xl ">
          Category
        </label>

        <CategoryDropdown handleChange={handleChange} blogInput={blogInput} />
      </div>
      <div className="formGroup col-span-2 ">
        <label htmlFor="description" className="text-xl ">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description Here..."
          className="p-2 dark:border-0 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-celestial-blue "
          required
          value={blogInput.description}
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-end col-span-2">
        <button disabled={isDisabled} type="button">
          <Link
            className={`${!isDisabled ? "blue_btn" : "hidden"} `}
            href={
              type === "add" ? "/createBlog/write" : `/EditBlog/${id}/write`
            }
          >
            Next
          </Link>
        </button>
      </div>
    </form>
  );
};

export default Form;
