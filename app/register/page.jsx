"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const styles = {
  formInput: "w-full bg-gray-100 border border-gray-300 text-gray-800 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-gray-900",
  submitButton: "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600",
};
const RegisterPage = () => {
  const router = useRouter(); // Initialize the router
  

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    fatherName: "",
    motherName: "",
    dob: "",
    course: "",
    certificateId: "",
    totalMarks: "",
    grade: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/api/register", formData);
      console.log(result);
      if (result.status === 200 || result.status === 201) {
        console.log('success')
        alert("Registration Successful");
        router.push("/result");
      } else {
        console.log('something went wrong')
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-4xl text-center font-semibold text-gray-800 mb-8">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <input
              key={key}
              type="text"
              className={styles.formInput}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value}
              name={key}
              onChange={handleChange}
              required
            />
          ))}

          <button
            type="submit"
            className={styles.submitButton}
          >
            Register
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  </>
  );
};

export default RegisterPage;
