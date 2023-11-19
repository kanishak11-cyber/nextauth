"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {

  return (
    <div>
      <div>
        <nav className="flex flex-row justify-between px-28 py-4 gap-4">
          <div>
            Home
          </div>
          <div className="flex flex-row gap-4 ">
            <Link href='/register'>Register</Link>
            <Link href='/result'>Login</Link>
          </div>
        </nav>
      </div>
      {/* <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="https://vmace.in">
            <li>Home</li>
          </Link>
        </div>
        <div className="flex gap-10">
          <li>
            <button
              onClick={() => {
                signOut();
              }}
              className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
            >
              Logout
            </button>
          </li>
        </div>
      </ul> */}
    </div>
  );
};

export default Navbar;
