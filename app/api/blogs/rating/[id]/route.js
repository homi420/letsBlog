import Blogs from "@models/Blogs";
import { connectToDB } from "@utils/database";
import User from "@models/User";
export const POST = async (req, { params }) => {
  const { rater, rating } = await req.json();
  const { id } = params;
  try {
    await connectToDB();
    const blog = await Blogs.findById(id).populate("user");
    if (!rater) {
      return new Response(JSON.stringify({ message: "Please login first." }), {
        status: 400,
      });
    }
    const user = await User.findById(rater);
    if (!blog) {
      return new Response(JSON.stringify({ message: "Blog not found" }), {
        status: 404,
      });
    } else {
      const alreadyReviewed = blog.ratings.find(
        (review) => review.userId.toString() === user._id.toString()
      );

      if (alreadyReviewed) {
        const existingRatingIndex = blog.ratings.findIndex(
          (r) => r.userId === rater
        );

        if (existingRatingIndex !== -1) {
          // Update the existing rating
          blog.ratings[existingRatingIndex].rating = rating;
          blog.totalRating = blog.ratings.length;
          blog.avgRating =
            blog.ratings.reduce((acc, item) => item.rating + acc, 0) /
            blog.ratings.length;
          await blog.save();
          return new Response(JSON.stringify({ message: "Rating Updated" }), {
            status: 200,
          });
        }
      }
      blog.ratings.push({ rating: Number(rating), userId: rater });
      blog.totalRating = blog.ratings.length;
      blog.avgRating =
        blog.ratings.reduce((acc, item) => item.rating + acc, 0) /
        blog.ratings.length;
      await blog.save();
      return new Response(JSON.stringify({ message: "Rated The Blog" }));
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
