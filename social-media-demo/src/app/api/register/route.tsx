import { NextResponse } from "next/server";
import prisma from "@/utils/db";

const bcrypt = require('bcrypt')

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    // Use Prisma's `user.create` method correctly with the appropriate data structure
    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      }
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}