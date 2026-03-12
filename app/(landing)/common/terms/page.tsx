import type { Metadata } from "next";
import TermsPage from "./terms";

export const metadata: Metadata = {
  title: "Terms & Conditions | 2k1s",
  description:
    "Read the Terms and Conditions of 2k1s, a platform for sharing commercial store space across India.",
  alternates: {
    canonical: "https://www.2k1s.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermPage() {
  return (
    <div>
      <TermsPage />
    </div>
  );
}
