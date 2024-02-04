"use server"

import prisma from "@/utils/db"
import { FeedPost } from "@prisma/client"
import { unstable_noStore as noStore } from "next/cache"

export async function getAllFeedPosts() {
    noStore()
    try {
        const res = await prisma.feedPost.findMany()
        return res as FeedPost[]
    } catch (error) {
        console.log(error)
    }
}