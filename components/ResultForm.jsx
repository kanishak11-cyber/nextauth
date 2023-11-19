"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';


export default function ResultForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const params = useSearchParams();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/register?username=${params.get('username')}`);
      console.log(response)

      if (response.status === 200) {
        setResult(response.data);
      } else {
        setResult('');
        console.error('Error fetching result:', data.error);
      }
    } catch (error) {
      setResult('');
      console.error('Error fetching result:', error);
    }
  };

  return (
    <div className='min-h-screen mx-auto items-center flex flex-col justify-center '>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label htmlFor="username">Enter Username or Enrollment ID:</label>
        <input
          type="text"
          id="username"
          value={inputValue}
          onChange={handleInputChange}
          className='border border-black '
        />
        <button type="submit" className='bg-cyan-500 text-white px-4 py-1 rounded-md'>Get Result</button>
      </form>

      {result && (
        <div>
          <h2>Result for {result.name}</h2>
          <p>Course: {result.course}</p>
          <p>Result: {result.result}</p>
        </div>
      )}
    </div>
  );
}
