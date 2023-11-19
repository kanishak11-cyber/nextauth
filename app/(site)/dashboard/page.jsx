"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React,{useEffect} from 'react'
const Dashboard = () => {
  // Retrieve session information
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login page if there is no active session
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "authenticated" ? (
        <div className="text-center">
          <p className="mb-2">Name: {session.user.name}</p>
          <p className="mb-2">{session.user.email}</p>
          <p className="mb-2">{session.user.dob}</p>
          <p className="mb-2">{session.user.fatherName}</p>
          <p className="mb-2">{session.user.motherName}</p>
          <p className="mb-2">{session.user.course}</p>
          <p className="mb-2">{session.user.certificateId}</p>
        </div>
      ) : (
        <p>Not authenticated. Redirecting to login...</p>
      )}
    </div>
  );
};

export default Dashboard;