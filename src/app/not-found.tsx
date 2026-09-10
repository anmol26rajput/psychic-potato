import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-[160px]">
      <div className="container-x flex flex-col items-center text-center">
        <span className="text-[110px] font-black leading-none text-[#ececec] md:text-[150px]">
          404
        </span>

        <h1 className="h1 -mt-4 md:-mt-6">
          Nothing <span className="font-serif italic">here</span>.
        </h1>
        <p className="body-md mt-4 max-w-[480px]">
          That page has either moved or never existed. The work and the writing
          are both a click away.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn">
            <span>Back Home</span>
          </Link>
          <Link href="/work" className="btn">
            <span>See the Work</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
