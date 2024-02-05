"use server"

import prisma from "@/utils/db"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "../api/auth/[...nextauth]/options"

export async function addFeedPost(formData: FormData) {
    try {
        // do the adding operation
        const description = formData.get('description') as string
        
        if (!description) {
            throw new Error("No decription")
        }

        const session = await getServerSession(authOptions)

        if (!session || !session.user || !session.user.email) {
            throw new Error("No session")
        }

        await prisma.feedPost.create({data: {
            description,
            user: {
                connect: {
                    email: session.user.email
                }
            }
        }})
    } catch (error) {
        console.log(error)
    }

    revalidatePath('/')
}

export async function likeFeedPost(postId: string) {

    try {
        console.log('like')
        const post = await prisma.feedPost.findUnique({where: {
            id: postId
        }})

        if (!post) {
            throw new Error("No post")
        }

        const session = await getServerSession(authOptions)

        if (!session || !session.user || !session.user.email) {
            throw new Error("No session")
        }

        const user = await prisma.user.findUnique({where: {
            email: session.user.email
        }})

        if (!user) {
            throw new Error("No user found")
        }

        var currentLikes: number = post.likesCount || 0
        var newUsersThatLiked = post.usersThatLiked.concat(user.id)

        await prisma.feedPost.update({where: {
            id: postId
        }, data: {
            likesCount: currentLikes +1,
            usersThatLiked: newUsersThatLiked
        }})

        var userLikedFeedPosts = user.likedFeedPosts.concat(post.id)

        await prisma.user.update({where: {
            id: user.id
        }, data: {
            likedFeedPosts: userLikedFeedPosts
        }})

    } catch (error) {
        console.log(error)
    }

    revalidatePath('/')
    
}