import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";
export const POST = async (req) => {
  const { user, title, category, blog, description } = await req.json();
  try {
    await connectToDB();

    await Blog.create({
      user,
      title,
      category,
      blog,
      description,
      avgRating: 0,
      totalRating: 0,
      ratings: [],
    });
    console.log(blog);
    return new Response(
      JSON.stringify({ message: "Blog Posted Successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return new Response(JSON.stringify({ message: "Title already Exists" }), {
        status: 400,
      });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
};
