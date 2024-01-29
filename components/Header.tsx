import siteMetadata from "@/data/siteMetadata";
import navdata from '@/data/navdata';
import Link from "./Link";
import { ImGithub } from "react-icons/im";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-10">
           <Link href="/" > <h1>HEADER</h1></Link>

            <nav className="flex ">
{navdata.map(item=>(<Link key={item.title} href={item.href} className="font-medium text-gray-900 px-4 text-white">{item.title}</Link>))}
            <Link href="https://github.com/Lokavit"><ImGithub size={24} /></Link>
            </nav>
        </header>
    )
}
