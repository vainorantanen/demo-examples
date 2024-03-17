"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Button className="text-white text-2xl font-bold hover:underline">
            <Link href="/">Home</Link>
          </Button>
        </div>
        <div className="hidden md:flex space-x-4">
          {!session && (
            <Button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            <Link href="/login">Log in</Link>
          </Button>
          )}
          {session ? (
            <span className="text-white">
              Logged in: <span className="text-white font-semibold">{session?.user?.email}</span>
              <br></br>
              {session.user?.email}
            </span>
          ) : null}
          {session ? (
            <Button
              onClick={() => signOut()}
              className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
            >
              Log out
            </Button>
          ) : null}
        </div>
        <Sheet>
        <SheetTrigger>
        <GiHamburgerMenu className="mx-2" />
      </SheetTrigger>
      <SheetContent>
          <ul className="flex flex-col items-center mt-4 space-y-4">
            <li>
            <Button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
            <Link href="/">Home</Link>
          </Button>
            </li>
            {!session && (
              <li>
              <Button  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                <Link href="/login">Log in</Link>
              </Button>
            </li>
            )}
            {session && (
             <div className="text-black">
               <li>
                Logged in:{" "}
                <span className="font-semibold">{session?.user?.email}</span>
              </li>
              <li>
                <Link href={'/profile'}>
                  Profile
                </Link>
              </li>
             </div>
            )}
            {session ? (
              <Button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold px-3 py-1 mt-2 rounded hover:bg-red-600"
              >
                Log out
              </Button>
            ) : null}
          </ul>
          </SheetContent>
          </Sheet>
          </div>
    </nav>
  );
}