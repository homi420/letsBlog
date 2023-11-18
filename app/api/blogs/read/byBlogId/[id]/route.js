import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const blogId = params.id;
  try {
    await connectToDB();
    const resp = await Blog.findById(blogId).populate("user").populate("ratings");
    return new Response(JSON.stringify(resp), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error!" }), {
      status: 500,
    });
  }
};
