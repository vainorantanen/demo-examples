"use client"

import { Button } from "@/components/ui/button"

export type LikeFeedPostProps = {
    postId: string,
    likeFeedPost: (postId: string) => void
}

export default function LikeFeedPostButton({postId, likeFeedPost}: LikeFeedPostProps) {

    return (
        <Button onClick={() => likeFeedPost(postId)}>
            Like
        </Button>
    )

}