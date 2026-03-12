import Image from "next/image";
import FrontendDeveloperJob from "./carrer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at 2k1s | Join Our Store Sharing Startup",
  description:
    "Explore career opportunities at 2k1s. Join our mission to revolutionize commercial store space sharing and help small businesses reduce rental costs across India.",
  keywords: [
    "2k1s careers",
    "2k1s jobs",
    "startup jobs India",
    "commercial real estate startup jobs",
    "retail tech jobs",
    "join 2k1s team",
  ],
  alternates: {
    canonical: "https://www.2k1s.com/careers",
  },
  openGraph: {
    title: "Careers at 2k1s",
    description:
      "Join 2k1s and help build the future of commercial store space sharing in India.",
    url: "https://www.2k1s.com/careers",
    siteName: "2k1s",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function page() {
  return (
    <main className="w-full ">
      {/* HERO IMAGE SECTION */}
      <section className="relative h-[60vh] w-full mb-6 md:h-[70vh]">
        <Image
          src="/carer.jpg" // replace with your image
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
            Work with Us
          </h2>
        </div>
      </section>

      {/* CONTENT SECTION */}

      <FrontendDeveloperJob />
    </main>
  );
}
