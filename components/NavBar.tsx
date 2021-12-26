import { useRouter } from "next/router";
import type { Link as LinkType } from "../lib/types/page";
import Link from "next/link";

export default function NavBar() {
  const links = [
    {
      title: "Research",
      url: "/research",
    },
    {
      title: "Projects",
      url: "/projects",
    },
    {
      title: "CV",
      url: "/cv",
    },
  ];
  const router = useRouter();
  return (
    <nav className="w-full bg-green-800 p-5">
      <div className="text-white flex flex-row justify-between max-w-screen-lg mx-auto">
        <div>
          <Link href="/" passHref>
            <a className="font-bold">Charlie Hultquist</a>
          </Link>
        </div>
        <div className="space-x-8">
          {links.map((link) => {
            return (
              <Link passHref href={link.url} key={link.url}>
                <a className={link.url === router.pathname ? "font-bold" : ""}>
                  {link.title}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
