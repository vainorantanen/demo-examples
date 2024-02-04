"use server"

import prisma from "@/utils/db"
import { revalidatePath } from "next/cache"

export async function addFeedPost(formData: FormData) {
    try {
        // do the adding operation
        const description = formData.get('description') as string
        
        if (!description) {
            throw new Error("No decription")
        }

        await prisma.feedPost.create({data: {
            description
        }})
    } catch (error) {
        console.log(error)
    }

    revalidatePath('/')
}