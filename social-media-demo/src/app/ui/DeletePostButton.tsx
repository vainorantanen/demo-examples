"use client"

import { Button } from "@/components/ui/button"

interface Props {
    postId: string
    deletePost: (postId:string) => Promise<void>
}

export default function DeletePostButton({postId, deletePost}:Props) {


    const handleClick = async () => {
        if (!window.confirm("Confirm delete?")) {
            return
        }
        try {
            await deletePost(postId)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button onClick={handleClick}
        className="bg-red-500 p-2 m-1 hover:bg-red-600">
            Delete post
        </Button>
    )
}