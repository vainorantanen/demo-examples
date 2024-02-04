"use client"

import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button className="text-white text-2xl font-bold hover:underline">
            <Link href="/">Home</Link>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          {!session && (
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            <Link href="/login">Log in</Link>
          </button>
          )}
          {session ? (
            <span className="text-white">
              Logged in: <span className="text-white font-semibold">{session?.user?.email}</span>
              <br></br>
              {session.user?.email}
            </span>
          ) : null}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
            >
              Log out
            </button>
          ) : null}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden text-white">
          <ul className="flex flex-col items-center mt-4 space-y-4">
            <li>
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            <Link href="/">Home</Link>
          </button>
            </li>
            <li>
              <button  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                <Link href="/login">Log in</Link>
              </button>
            </li>
            {session && (
              <li>
                Logged in:{" "}
                <span className="text-white font-semibold">{session?.user?.email}</span>
              </li>
            )}
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Log out
              </button>
            ) : null}
          </ul>
        </div>
      )}
    </nav>
  );
}