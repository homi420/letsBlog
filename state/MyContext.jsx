"use client";
import { useEffect, useState } from "react";
import { useSession, getProviders } from "next-auth/react";
import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

// Create a context with an initial state
const MyContext = createContext();

// Create a provider component that wraps your app
export const MyContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [blogToUpdate, setBlogToUpdate] = useState();
  const [rawContent, setRawContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  console.log(rawContent);

  const [providers, setProviders] = useState();
  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  const [blogInput, setBlogInput] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    bg: "",
  });
  const [type, setType] = useState("add");
  const router = useRouter();
  const handleAlert = async (response, json) => {
    if (response.ok) {
      setShowAlert({ show: true, message: json.message, bg: true });
      setTimeout(() => {
        setShowAlert({ show: false, message: "", bg: "" });
      }, 1000);
    } else {
      setShowAlert({ show: true, message: json.message, bg: false });
      setTimeout(() => {
        setShowAlert({ show: false, message: "", bg: "" });
      }, 1000);
    }
  };

  // Creating The Blog...
  const createBlog = async (e) => {
    e.preventDefault();

    const category =
      selectedCategory === "Other" ? blogInput.category : selectedCategory;
    if (selectedCategory != "Select a category") {
      setIsPosting(true);
      const response = await fetch("/api/blogs/create", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: blogInput.title,
          description: blogInput.description,
          category,
          user: session?.user.id,
          blog: JSON.stringify(rawContent),
        }),
      });
      setIsPosting(false);
      const json = await response.json();
      handleAlert(response, json);
      setIsPosting(false);
      setBlogInput({
        title: "",
        category: "",
        description: "",
      });
      router.push("/blogs");
    } else {
      alert("Select a category");
    }
  };
  // Updating the Blog...
  const updateBlog = async () => {
    setIsPosting(true);
    const response = await fetch(`/api/blogs/update/${blogToUpdate}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: blogInput.title,
        user: blogInput.user._id,
        category: selectedCategory,
        description: blogInput.description,
        blog: JSON.stringify(rawContent),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsPosting(false);
    const json = await response.json();
    handleAlert(response, json);
    setBlogInput({
      title: "",
      category: "",
      description: "",
    });
    router.push("/blogs");
    setType("add");
  };
  return (
    <MyContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        rawContent,
        setRawContent,
        createBlog,
        isPosting,
        blogInput,
        setBlogInput,
        setBlogToUpdate,
        updateBlog,
        type,
        setType,
        showAlert,
        handleAlert,
        providers,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to simplify accessing the context
export const useMyContext = () => useContext(MyContext);
