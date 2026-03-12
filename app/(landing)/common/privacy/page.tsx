import React from "react";
import Privacypage from "./privacy";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 2k1s",
  description:
    "Read the Privacy Policy of 2k1s to understand how we collect, use, and protect your data when using our store sharing platform in India.",
  alternates: {
    canonical: "https://www.2k1s.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <Privacypage />
    </div>
  );
};

export default page;
