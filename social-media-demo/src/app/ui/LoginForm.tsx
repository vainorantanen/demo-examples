"use client";


import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-blue-500 shadow-lg p-5 rounded-lg text-black">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="bg-white text-black rounded-lg px-3 py-2"
          />
          <Button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </Button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}