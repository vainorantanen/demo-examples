"use client"

import { useState } from "react";

export default function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
    
          const res = await fetch("api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          if (res.ok) {
            const form = e.target;
            form.reset();
    
          } else {
            console.log("User registration failed.");
          }
        } catch (error) {
          console.log("Error during registration: ", error);
        }
      };

    return (
        <div className="bg-blue-500 shadow-lg p-5 rounded-lg text-black">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">


            <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="bg-white text-black rounded-lg px-3 py-2"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="bg-white text-black rounded-lg px-3 py-2"
          />
            <button className="bg-blue-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
            </form>
        </div>
    )
}