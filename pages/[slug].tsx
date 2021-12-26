import { GetStaticPropsContext } from "next";
import client from "../client";
import NavBar from "../components/NavBar";
import { pageQuery } from "../query/page";
import Page from "../components/Page";

export default function Component(props: { pageData: any }) {
  return (
    <div>
      <NavBar />
      <Page pageData={props.pageData} />
    </div>
  );
}

export async function getStaticPaths() {
  const data = await client.fetch(`*[_type == "page"]{
      meta {
        slug {
            current
        }
      }
  }`);

  const paths = data
    .filter((page: any) => Boolean(page.meta.slug.current))
    .map((page: any) => {
      return { params: { slug: page.meta.slug.current } };
    });
  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // @ts-ignore
  const { slug = "" } = context.params;
  const data = await client.fetch(
    `*[_type == "page" && meta.slug.current == $slug]${pageQuery}[0]`,
    { slug }
  );
  return {
    props: {
      pageData: data,
    },
  };
}
