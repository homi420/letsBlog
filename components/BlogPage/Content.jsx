import MyReadOnlyEd from "@components/MyReadOnlyEd";
import React from "react";

const Content = ({ blog }) => {
  return (
    <div className="md:col-span-8 col-span-12">
      <p className="my-4 text-xl underline">{blog?.title}</p>
      <p className="my-4 text-gray-500">Created By @{blog?.user.userName}</p>
      <MyReadOnlyEd blogContent={blog?.blog} />
    </div>
  );
};

export default Content;
