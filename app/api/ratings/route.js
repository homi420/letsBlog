import Ratings from "@models/Ratings";
import { connectToDB } from "@utils/database";

const checkReview = async (user) => {
  const ratings = await Ratings.find({ user });
  if (ratings.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export const POST = async (req) => {
  const { user, review, rating } = await req.json();
  await connectToDB();
  if (!user) {
    return new Response(JSON.stringify({ message: "User Id is Required" }), {
      status: 400,
    });
  }
  if (!review) {
    return new Response(JSON.stringify({ message: "Review is Required" }), {
      status: 400,
    });
  }
  if (!rating) {
    return new Response(JSON.stringify({ message: "Rating is Required" }), {
      status: 400,
    });
  }
  try {
    const reviewExist = await checkReview(user);
    if (reviewExist) {
      return new Response(JSON.stringify({ message: "You already Rated" }), {
        status: 400,
      });
    }
    const newRating = await Ratings.create({
      user,
      review,
      rating,
    });
    return new Response(JSON.stringify({ message: "Review Posted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const GET = async (req) => {
  try {
    await connectToDB();
    const ratings = await Ratings.find().populate("user");
    return new Response(JSON.stringify(ratings), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error.code === "ETIMEDOUT") {
      return new Response(JSON.stringify({ message: "Gateway Timeout" }), {
        status: 504,
      });
    }

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
