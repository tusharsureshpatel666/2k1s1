import type { Metadata } from "next";
import ContactPage from "./Contact";

export const metadata: Metadata = {
  title: "Contact 2k1s | Store Sharing Platform in India",
  description:
    "Get in touch with 2k1s. Contact us for support, partnerships, business inquiries, or questions about sharing commercial store space in India.",
  keywords: [
    "contact 2k1s",
    "2k1s support",
    "store sharing contact",
    "commercial space sharing India",
    "retail space platform contact",
  ],
  alternates: {
    canonical: "https://www.2k1s.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return <ContactPage />;
}
