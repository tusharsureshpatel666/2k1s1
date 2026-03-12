import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About 2k1s | Share Commercial Store Space in India",
  description:
    "Learn about 2k1s, a platform helping small businesses share commercial store space and reduce rental costs across India.",
  alternates: {
    canonical: "https://www.2k1s.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="w-full ">
      {/* HERO IMAGE SECTION */}
      <section className="relative h-[60vh] w-full md:h-[70vh]">
        <Image
          src="/about.jpg" // replace with your image
          alt="About us hero"
          fill
          priority
          className="object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 rounded-2xl" />

        {/* Title */}
        <div className="absolute bottom-10 left-6 md:left-16">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            About us
          </h2>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="mx-auto max-w-5xl px-3 py-16 md:px-16">
        <h1 className="mb-6 text-3xl font-semibold leading-snug  md:text-4xl">
          We reimagine How Store Sharing Works
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-gray-600">
          2K1S is a platform designed to help shop owners and small businesses
          explore shared commercial space arrangements to reduce rental
          pressure. 2K1S acts only as a facilitation and discovery platform. We
          do not own, lease, manage, or control any commercial property listed
          on the platform.
        </p>
      </section>
    </main>
  );
}
