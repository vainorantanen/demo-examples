import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getPostById } from "@/app/lib/data"
import ModifyPostForm from "@/app/ui/ModifyPostForm"
import { getServerSession } from "next-auth"

export default async function ModifyPost({params}:any) {

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
        return <p>Log in to see profile</p>
    }

    const post = await getPostById(params.postId)

    if (!post) {
        return <p>No post found</p>
    }

    if (post.user.email !== session.user.email) {
        return <p>You are not authorized to modify</p>
    }

    return (
        <div className="mx-2">
            <h1>Modify post {post.description}</h1>
            <ModifyPostForm postId={post.id} description={post.description} />
        </div>
    )
    
}