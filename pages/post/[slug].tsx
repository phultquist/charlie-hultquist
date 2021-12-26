import { GetStaticPropsContext } from "next";
import client from "../../client";
import NavBar from "../../components/NavBar";
import BlockContent from "@sanity/block-content-to-react";
import Image from "next/image";
const serializers = {
  types: {
    image: (props: any) => {
      console.log(props);
      //   return <div>image</div>;
      const aspectRatio = props.node.asset.metadata.dimensions.aspectRatio;
      console.log(aspectRatio);

      return (
        <div
          style={{ aspectRatio: `${aspectRatio.toString()}` }}
          className={`w-full relative`}
        >
          <Image src={props.node.asset.url} layout="fill" alt="My Image" />
        </div>
      );
    },
  },
};

export default function Post(props: { pageData: any }) {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-lg mx-auto p-10">
        <div className="mb-8 space-y-4">
          <h1 className="font-bold text-3xl mb-3">{props.pageData.title}</h1>
          <p className="text-sm text-gray-500">
            {new Date(props.pageData.publishedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="prose">
          <BlockContent
            blocks={props.pageData.body}
            serializers={serializers}
          />
        </div>
      </div>
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

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  // @ts-ignore
  const { slug = "" } = context.params;
  const data = await client.fetch(
    `*[_type == "post" && slug.current == $slug]{
        ...,
        body[] {
            ...,
            _type == "image" => {
                ...,
                asset->{
                    url,
                    metadata {
                        ...,
                    },
                },
            }
                
        }
    }[0]`,
    { slug }
  );

  return {
    props: {
      pageData: data,
    },
  };
}
