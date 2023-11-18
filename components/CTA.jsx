import { useRouter } from "next/navigation";
import { getProviders, signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";

const CTA = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);
  const getStarted = (id) => {
    if (session?.user) {
      router.push("/createBlog");
    } else {
      signIn(id);
    }
  };
  return (
    <div className="flex justify-center items-center my-10  ">
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <button
              type="button"
              key={provider.name}
              onClick={() => getStarted(provider.id)}
              className="blue_btn "
            >
              <span className="flex text-4xl font-semibold">
                <FaPen /> Create Now
              </span>
            </button>
          );
        })}
    </div>
  );
};

export default CTA;
