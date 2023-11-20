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
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, router, status]);

  const data = session?.user
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "authenticated" ? (
        <div className="">
         <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-md ">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-lg leading-4 font-medium text-amber-900 uppercase tracking-wider">
              Field
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-lg leading-4 font-medium text-amber-900 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="uppercase">
          <UserDetailRow label="Name" value={data?.name} />
          <UserDetailRow label="Enrollment Number" value={data?.email} />
          <UserDetailRow
            label="Father Name"
            value={data?.fatherName}
          />
          <UserDetailRow
            label="Mother Name"
            value={data?.motherName}
          /><UserDetailRow
          label="Date of Birth"
          value={data?.dob}
        />
        <UserDetailRow
            label="Grade"
            value={data?.grade}
          />
          <UserDetailRow
            label="total Marks"
            value={data?.totalMarks}
          />
          <UserDetailRow
            label="Course Name"
            value={data?.course}
          />
          <UserDetailRow
            label="Certificate Number"
            value={data?.certificateId}
          />
          
          
        </tbody>
      </table>
          
        </div>
      ) : (
        <p>Not authenticated. Redirecting to login...</p>
      )}
    </div>
  );
};

export default Dashboard;

const UserDetailRow = ({ label, value }) => (
  <tr className=" ">
    <td className="px-6 py-4 whitespace-no-wrap text-md leading-5 font-semibold text-gray-900">
      {label}:
    </td>
    <td className="px-6 py-4 whitespace-no-wrap text-md leading-5 font-medium text-gray-900">
      {value}
    </td>
  </tr>
);