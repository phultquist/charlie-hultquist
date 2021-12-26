import type { NextPage } from "next";
import Head from "next/head";
import client from "../client";
import NavBar from "../components/NavBar";
import Page from "../components/Page";
import { pageQuery } from "../query/page";

const Home: NextPage<{ pageData: any }> = (props: { pageData: any }) => {
  return (
    <div>
      <NavBar />
      <Page pageData={props.pageData} />
    </div>
  );
};

export async function getStaticProps() {
  const data = await client.fetch(
    `*[_type == "page" && meta.slug.current == "home" ]${pageQuery}[0]`
  );

  return {
    props: {
      pageData: data,
    },
  };
}

export default Home;
