"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StoreCard from "../storeCard";
import { Button } from "@/components/ui/button";
import { FaBackward } from "react-icons/fa";
import Link from "next/link";

export default function SearchPage() {
  const params = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (!lat || !lng) return;

    fetch("/api/store/nearby", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: Number(lat),
        lng: Number(lng),
      }),
    })
      .then((res) => res.json())
      .then(setStores);
  }, [lat, lng]);

  return (
    <div className="w-full ">
      <Link
        href={"/dashboard"}
        className="flex justify-between mb-9 items-center"
      >
        <Button variant={"outline"}>
          <FaBackward /> Back
        </Button>
        <h2 className=" text-lg font-semibold">Nearest Store</h2>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}
