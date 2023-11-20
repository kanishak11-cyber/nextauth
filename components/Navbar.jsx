"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log(session?.user.name);
  return (
    <div className="flex flex-row justify-between px-28 py-5 text-xl shadow-md shadow-slate-150">
      {session ? (
        <div className="flex flex-row gap-4 items-center justify-evenly w-full ">
          <div>
            <Link href={"https://vmace.in"}>Home</Link>
          </div>
          
          <div className="text-gray-600">{session?.user.name} Dashboard!</div>
          <div>
            <button
            className="bg-cyan-500 text-white px-3 py-1 rounded-xl"
            onClick={() => signOut()}
          >
            Logout
          </button>
          </div>
          
        </div>
      ) : (
        <>
          <Link href={"https://vmace.in"}>Home</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
