"use client"

export type LikeFeedPostProps = {
    postId: string,
    likeFeedPost: (postId: string) => void
}

export default function LikeFeedPostButton({postId, likeFeedPost}: LikeFeedPostProps) {

    return (
        <button onClick={() => likeFeedPost(postId)}>
            Like
        </button>
    )

}