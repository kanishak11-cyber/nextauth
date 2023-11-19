"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
    const {data:session, status} = useSession();
    console.log(session?.user.name)
  return (
    <div className="flex flex-row justify-between px-28 py-5 text-xl shadow-md shadow-slate-150">
      {session ? (
        <div className="flex flex-row gap-4 items-end">
          <p className="text-gray-600">{session?.user.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
      <>
      <Link href={'/'}>Home</Link>
      <div className="flex flex-row gap-4 items-center justify-between">
        <Link href='/register'>Register</Link>
        <Link href='/login'>Login</Link>
      </div>
      </>
      
      )}
      
    </div>
  );
};

export default Navbar;
