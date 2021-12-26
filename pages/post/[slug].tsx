import { GetStaticPropsContext } from "next";
import client from "../../client";
import NavBar from "../../components/NavBar";

export default function Post(props: { pageData: any }) {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg mx-auto p-10">test</div>
      <pre>{JSON.stringify(props.pageData, null, 2)}</pre>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "post"]{
        slug {
            current
        }
    }`);

  const paths = data
    .filter((page: any) => Boolean(page.slug.current))
    .map((page: any) => {
      return { params: { slug: page.slug.current } };
    });

  console.log(paths);

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // @ts-ignore
  const { slug = "" } = context.params;
  const data = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
  return {
    props: {
      pageData: data,
    },
  };
}
