import Image from "next/image";
import AddFeedPostForm from "./ui/AddFeedPostForm";
import FeedPostList from "./ui/FeedPostList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-2">
      <Button>
      <Link href={`/register`}>Register</Link>
      </Button>
    <Button>
    <Link href={`/login`}>Login</Link>
    </Button>
    <div>
      <h1>Add a new post</h1>
      <AddFeedPostForm />
      </div>
      <div>
        <h1>Newest posts</h1>
      <FeedPostList />
      </div>
    </div>
  );
}
