"use client";
import { useSearchParams, useRouter } from "next/navigation"; // Correct import
import axios from "axios";
import React, { useEffect, useState } from "react";
const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [formData, setFormData] = useState({
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/register", formData);

      if (response.data.user) {
        // Handle the user data as needed
        console.log(response.data.user);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error searching for user:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = () => {
      const result = axios.get("/api/register").then((res) => {
        const data = result.data
        console.log("fetched data: ", data);
        return res;
      });
    };
    
    fetchUserData();
  }, []);

  return (
    <div>
      Result
      <div className="min-h-[60vh] flex items-center justify-center ">
        <form method="GET" className="flex flex-col mx-auto gap-4 ">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            className="border px-4 py-1 border-black focus:outline-2 rounded-lg "
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <button
            type="submit"
            onClick={() =>
              router.push(
                `/result?username=${formData.username} && ${handleSubmit}`
              )
            }
            className="px-3 py-1 border bg-amber-800 rounded-lg text-white"
          >
            Submit
          </button>
        </form>
      </div>
      {username}
    </div>
  );
};

export default ResultPage;
