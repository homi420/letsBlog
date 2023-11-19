import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";

export const PATCH = async (req, { params }) => {
  const id = params.id;
  const { user, title, category, description, blog } = await req.json();
  console.log(blog);
  try {
    await connectToDB();
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
