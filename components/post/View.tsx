import { Post } from "../../lib/types/post";
import List from "./List";
import Grid from "./Grid";
export default function PostView(props: {
  posts: Post[];
  layout: "list" | "grid";
}) {
  console.log(props.posts);
  console.log(props.layout);

  if (!props.posts) {
    return <div></div>;
  }

  return props.layout === "list" ? (
    <List posts={props.posts} />
  ) : (
    <Grid posts={props.posts} />
  );
}
