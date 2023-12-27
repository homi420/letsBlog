import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const field = params.field;
  const id = params.id;
  await connectToDB();
  try {
    const resp = await Blog.find({
      _id: { $ne: id },
      category: field,
    })
      .populate("user")
      .populate("ratings");
    return new Response(JSON.stringify(resp), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
