import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, { params }) => {
  const { user } = await req.json();
  const id = params.id;
  try {
    await connectToDB();
    const blog = await Blog.findById(id);
    if (blog) {
      if (JSON.stringify(blog.user) == JSON.stringify(user)) {
        await Blog.findByIdAndRemove(id);
        return new Response(
          JSON.stringify(
            { message: "Blog Deleted Successfully" },
            { status: 200 }
          )
        );
      } else {
        return new Response(JSON.stringify({ message: "Not Allowed!" }), {
          status: 400,
        });
      }
    } else {
      return new Response(JSON.stringify({ message: "Not Found!" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error!", { status: 500 });
  }
};
