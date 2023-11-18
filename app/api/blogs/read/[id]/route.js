import Blog from "@models/Blogs";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const userId = params.id;
  console.log(params);
  try {
    await connectToDB();
    const resp = await Blog.find({ user: userId }).populate("user");
    console.log(resp);
    return new Response(JSON.stringify(resp), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error! Try Reloading The Page",
      }),
      {
        status: 500,
      }
    );
  }
};
