import { getAllFeedPosts } from "../lib/data"

export default async function FeedPostList() {

    const feedPosts = await getAllFeedPosts()

    if (!feedPosts) {
        return null
    }

    return (

        <div>
            {feedPosts.map(feedPost => (
                <div key={feedPost.id} className="rounded my-2 p-2 bg-white text-black">
                    <p>{feedPost.description}</p>
                </div>
            ))}
        </div>
    )
}