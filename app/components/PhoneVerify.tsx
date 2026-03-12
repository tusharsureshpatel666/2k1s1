"use client";

import { useEffect, useState } from "react";
import PhoneModal from "./PhoneModel";

const PhoneVerify = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    const checkPhone = async () => {
      const res = await fetch("/api/phone");
      const data = await res.json();
      setVerified(data.verified);
      setLoading(false);
    };

    checkPhone();
  }, []);

  if (loading) return null;

  return <>{!verified && <PhoneModal />}</>;
};

export default PhoneVerify;
