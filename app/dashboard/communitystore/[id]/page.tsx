"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MobileImageSlider } from "../../store/[id]/components/MobileNav";
import { DesktopImageGrid } from "../../store/[id]/components/Desktopgrid";
import { Button } from "@/components/ui/button";
import CommunityShareStore from "../components/CommunityStoreShare";
import Heading from "../../components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import People from "../../store/[id]/components/people";
import LocationMap from "../../store/[id]/components/MapShower";
import { Search } from "lucide-react";
import Link from "next/link";

const CommunityStore = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/getCommunityStore", {
          params: { id },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 🔹 Skeleton Loader
  if (loading) {
    return (
      <div className="w-full space-y-4 px-2 md:px-0">
        <div className="flex pb-5 gap-4 justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Skeleton className="w-full h-[250px] rounded-xl" />

        <div className="hidden md:grid grid-cols-3 gap-4">
          <Skeleton className="col-span-2 h-[300px] rounded-xl" />
          <div className="grid gap-4">
            <Skeleton className="h-[145px] rounded-xl" />
            <Skeleton className="h-[145px] rounded-xl" />
          </div>
        </div>

        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    );
  }

  const allImages = [
    data?.bannerImageUrl,
    ...(data?.images?.map((img) => img.url) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6 pb-24 lg:pb-0 px-2 md:px-4 lg:px-0">
      {/* 🔹 Header */}
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-lg md:text-xl font-semibold break-words">
          {data?.title}
        </h1>

        <CommunityShareStore paramsId={data?.id} />
      </div>

      {/* 🔹 Mobile Slider */}
      <div className="block md:hidden">
        <MobileImageSlider images={allImages} />
      </div>

      {/* 🔹 Desktop Grid */}
      <div className="hidden md:block">
        <DesktopImageGrid
          banner={data?.bannerImageUrl || ""}
          images={data?.images?.map((img) => img.url) || []}
        />
      </div>

      {/* 🔹 Heading (VISIBLE ON ALL SCREENS) */}
      <Heading
        title={`${data?.storeSize?.replace(/store/i, "size")} in ${data?.city}`}
        className="mt-2"
      />

      {/* 🔹 Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* ✅ People Section */}
        <People description={data?.peopleDesc} />

        {/* ✅ Sidebar (Desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-2xl shadow-sm p-6 space-y-5">
            {/* Price */}
            <div>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">₹{data?.priceInr}</span>
                <span className="text-sm text-gray-500 mb-1">/month</span>
              </div>

              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            <div className="border-t"></div>

            {/* Offers */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-orange-600">
                Save Extra with offers
              </h3>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm">
                Cashback: Get 5% back with select cards.
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm">
                Bank Offer: 7.5% discount on EMI.
              </div>
            </div>

            {/* CTA */}
            <Link href={`/dashboard/communitystore/findpartner/${id}`}>
              <Button className="w-full py-3 rounded-2xl">
                <Search className="w-5 h-5 mr-2" />
                Search For Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Map (VISIBLE ON ALL SCREENS) */}
      <div className="mt-6">
        <LocationMap
          lat={data?.latitude}
          lng={data?.longitude}
          city={data?.city}
          state={data?.state}
        />
      </div>

      {/* 🔹 Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-12 left-0 right-0 border-t bg-white dark:bg-black px-4 py-3 z-20">
        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-end gap-1">
            <span className="text-xl font-bold">₹{data?.priceInr}</span>
            <span className="text-xs text-gray-500">/month</span>
          </div>

          {/* CTA */}
          <Link href={`/dashboard/communitystore/findpartner/${id}`}>
            <Button className="rounded-2xl px-4 py-2">
              <Search className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityStore;
