import { Post } from "../../lib/types/post";
import Link from "next/link";

export default function PostList(props: { posts: Post[] }) {
  return (
    <div className="w-full">
      {props.posts.map((post) => {
        return (
          <Link
            passHref
            key={post.slug.current}
            href={`/post/` + post.slug.current}
          >
            <div className="py-3 first:border-t-0 border-t cursor-pointer w-full flex flex-row justify-between group">
              <h3 className="font-medium text-xl">
                {post.title}
                <p className="inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  &rarr;
                </p>
              </h3>
              <p className=" text-gray-400 text-sm">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
