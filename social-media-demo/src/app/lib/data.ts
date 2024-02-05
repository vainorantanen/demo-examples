"use server"

import prisma from "@/utils/db"
import { FeedPost, User } from "@prisma/client"
import { unstable_noStore as noStore } from "next/cache"

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
    try {
        const res = await prisma.user.findUnique({where: {
            id: userId
        }})

        return res as User
    } catch (error) {
        console.log(error)
    }
}