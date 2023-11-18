import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";
import misterCrud from "mister-crud";

export const PATCH = async (req) => {
  const { id, user, title, category, description, blog } = await req.json();
  try {
    await connectToDB();
    console.log(blog);
    const blogToFind = await Blog.findById(id);
    if (JSON.stringify(blogToFind.user) === JSON.stringify(user)) {
      await Blog.findByIdAndUpdate(
        id,
        { title, description, category, blog },
        { new: true }
      );
      return new Response(
        JSON.stringify({ message: "Blog Updated Successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Not Allowed" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
