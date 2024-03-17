import { Card } from "@/components/ui/card"
import { likeFeedPost } from "../lib/actions"
import { getAllFeedPosts, getUserDataByUserId } from "../lib/data"
import LikeFeedPostButton from "./LikeFeedPostButton"

export default async function FeedPostList() {

    const feedPosts = await getAllFeedPosts()

    if (!feedPosts) {
        return null
    }

    return (

        <div>
            {feedPosts && feedPosts.length > 0 && feedPosts.map(feedPost => {

                return (
                    <Card key={feedPost.id}
                        className="rounded my-2 p-2 bg-white text-black">
                    <div>
                    <p>{feedPost.description}</p>
                    <p>{feedPost.user.email}</p>
                    <LikeFeedPostButton postId={feedPost.id} likeFeedPost={likeFeedPost}/>
                    <p>{feedPost.likesCount || 0}</p>
                    </div>
                </Card>
                )
            }
                )
                
                }
        </div>
    )
}