import type { Metadata } from "next";
import ContactPage from "./Contact";

export const metadata: Metadata = {
  title: "Contact AllPuts | Store Sharing Platform in India",
  description:
    "Get in touch with AllPuts. Contact us for support, partnerships, business inquiries, or questions about sharing commercial store space in India.",
  keywords: [
    "contact AllPuts",
    "AllPuts support",
    "store sharing contact",
    "commercial space sharing India",
    "retail space platform contact",
  ],
  alternates: {
    canonical: "https://www.AllPuts.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return <ContactPage />;
}
