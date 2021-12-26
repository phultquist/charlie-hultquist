import { Post } from "../../lib/types/post";
import Link from "next/link";

export default function Component(props: { posts: Post[] }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
      {props.posts.map((post) => {
        return (
          <Link
            passHref
            key={post.slug.current}
            href={`/post/` + post.slug.current}
          >
            <div className="cursor-pointer rounded-lg p-7 border-2 border-gray-100 w-full hover:border-gray-300 hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-xl truncate">{post.title}</h3>
              <p className="text-gray-400 text-sm">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
