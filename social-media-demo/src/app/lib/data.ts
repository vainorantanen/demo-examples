"use server"

import prisma from "@/utils/db"
import { FeedPost, User } from "@prisma/client"
import { getServerSession } from "next-auth"
import { unstable_noStore as noStore } from "next/cache"
import { authOptions } from "../api/auth/[...nextauth]/options"

export async function getAllFeedPosts() {
    noStore()
    try {
        const res = await prisma.feedPost.findMany({
          include: {
            user: true,
          },
        });
    
        return res
      } catch (error) {
        console.error(error);
        throw error;
      }
}

export async function getUserDataByUserId(userId: string) {
  noStore()
    try {
        const res = await prisma.user.findUnique({where: {
            id: userId
        }})

        return res as User
    } catch (error) {
        console.log(error)
    }
}

export async function getUsersPosts() {
  noStore()
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      throw new Error ("Log in to continue")
    }

    const res = await prisma.feedPost.findMany({where: {
      user: {
        email: session.user.email
      }
    }})

    return res as FeedPost[]
  } catch (error) {
    console.log(error)
  }
}

export async function getPostById(postId: string) {
  noStore()
  try {
    const res = await prisma.feedPost.findUnique({where: {
      id: postId
    }, include: {
      user: {
        select: {
          email: true
        }
      }
    }})

    return res
  } catch (error) {
    console.log(error)
  }
}