import { FeedPost } from "@prisma/client"

export type FeedPostData = {
    feedPosts: FeedPost[]
    userData: UserData
}

export type UserData = {
    name: string
    email: string
}