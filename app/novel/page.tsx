import novel from '@/data/novel';
import Link from "@/components/Link";

export default function Novel() {

  return (
    <section className="flex min-h-screen flex-col items-center p-24">

      <h1>Novel</h1>
      <section className="flex justify-between flex-wrap">
     {novel.map(item=>(
       <Link key={item.dir} href={`novel/${item.dir}`} className="block m-10">

     <span className="font-medium text-gray-900 px-4 text-white text-7xl">{item.title}</span>

     </Link>))}
</section>
    </section>
  );
}
