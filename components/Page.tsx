import Image from "next/image";
import Link from "next/link";
import BlockContent from "@sanity/block-content-to-react";
import { Link as LinkType } from "../lib/types/page";
import PostView from "./post/View";

export default function Page(props: { pageData: any }) {
  return (
    <div className="max-w-screen-lg mx-auto py-4 px-8">
      <div className="flex flex-row justify-start pt-10 space-x-8">
        {props.pageData.image && (
          <div className="w-48 h-48 flex-none rounded-full relative overflow-hidden">
            <Image
              src={props.pageData.image.asset.url}
              layout="fill"
              alt="Charlie Hultquist"
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{props.pageData.header}</h1>
          {props.pageData.body && (
            <article className="prose mt-2">
              {props.pageData.body && (
                <BlockContent blocks={props.pageData.body} />
              )}
              {/* {props.pageData.body && BlockContentToHtml(props.pageData.body)} */}
            </article>
          )}
          {props.pageData.links && (
            <div className="p-4 space-x-6">
              {props.pageData.links.map((link: LinkType) => {
                return (
                  <Link href={link.url} passHref key={link.title}>
                    <a className="font-semibold group">
                      {link.title}{" "}
                      <p className="transition-all group-hover:translate-x-[0.1rem] duration-300 inline-block">
                        &rarr;
                      </p>
                    </a>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="mb-10 mt-4">
        {props.pageData.postview && props.pageData.postview && (
          <PostView
            posts={props.pageData.postview.posts}
            layout={props.pageData.postview.poststyle}
          />
        )}
      </div>
      {props.pageData.embed && (
        <div className="my-6 w-full h-[80vh] rounded-md overflow-hidden shadow-sm">
          <iframe
            className="w-full h-full"
            src={props.pageData.embed}
            title={props.pageData.title}
          />
        </div>
      )}
      {props.pageData.gallery && (
        <div className="my-10 flex flex-wrap">
          {props.pageData.gallery.map((image: { asset: { url: string } }) => {
            return (
              <div className="w-1/4 aspect-square p-4" key={image.asset.url}>
                <div className="w-full h-full relative">
                  <Image
                    src={image.asset.url}
                    alt={"Image of my project"}
                    layout="fill"
                    className="rounded-sm object-cover cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <pre>{JSON.stringify(props.pageData, null, 2)}</pre>;
    </div>
  );
}
