import Image from "next/image";
import AddFeedPostForm from "./ui/AddFeedPostForm";
import FeedPostList from "./ui/FeedPostList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Social Media Feed</h1>
      <Link href={`/register`}>Register</Link>
      <Link href={`/login`}>Login</Link>
      <AddFeedPostForm />
      <div>
      <FeedPostList />
      </div>
    </div>
  );
}
