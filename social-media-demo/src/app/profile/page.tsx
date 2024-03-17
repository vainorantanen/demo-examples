import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { getUsersPosts } from "../lib/data";
import Link from "next/link";
import DeletePostButton from "../ui/DeletePostButton";
import { deletePost } from "../lib/actions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProfilePage() {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
        return <p>Log in to see profile</p>
    }

    const posts = await getUsersPosts()

    return (
        <div className="mx-2">
            <h1>Welcome, {session.user.email}</h1>
            <h1>Your posts</h1>
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <Card key={post.id} className="my-3 p-2 bg-white rounded-xl text-black">
                        <h1>{post.description}</h1>
                        <p>Likes: {post.likesCount || 0}</p>
                        <Button>
                        <Link href={`/profile/modify-post/${post.id}`}>
                            Modify post
                        </Link>
                        </Button>
                        <DeletePostButton postId={post.id} deletePost={deletePost} />
                    </Card>
                ))
            ): (
                <p>No posts</p>
            )}
        </div>
    )
}