"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    useEffect(() => {
        if (session && session?.user?.email && status === "authenticated") {
            router.push("/dashboard");
        }
        }, [session, router, status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const callback = await signIn("credentials", {
      ...formData,
      redirect: false,
    });
    if (callback?.error) {
      console.error(callback.error);
    } else if (callback?.ok && !callback?.error) {
      
      console.log("Logged In successfully");
      router.push("/dashboard");
    }
  };

  return( 
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <form
      onSubmit={submitHandler}
      className="bg-white p-8 rounded shadow-md max-w-md w-full"
    >
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          username
        </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          type="date"
          name="password"
          placeholder="DD-MM-YYYY"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </div>
  );
};

export default LoginForm;
