"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MobileImageSlider } from "../../store/[id]/components/MobileNav";
import { DesktopImageGrid } from "../../store/[id]/components/Desktopgrid";
import { Button } from "@/components/ui/button";
import { FaChartArea } from "react-icons/fa";
import CommunityShareStore from "../components/CommunityStoreShare";
import Heading from "../../components/heading";
import { Skeleton } from "@/components/ui/skeleton";
import People from "../../store/[id]/components/people";
import LocationMap from "../../store/[id]/components/MapShower";
import Communitybtn from "../components/Communitybtn";
import { Search } from "lucide-react";
import Link from "next/link";

const CommunityStore = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handelSubmit = async () => {
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
    if (id) handelSubmit();
  }, [id]);

  // 🔹 Skeleton Loader
  if (loading) {
    return (
      <div className="w-full space-y-4">
        {/* Header */}
        <div className="flex pb-5 gap-4 justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Mobile Image */}
        <Skeleton className="w-full h-[250px] rounded-xl" />

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          <Skeleton className="col-span-2 h-[300px] rounded-xl" />
          <div className="grid gap-4">
            <Skeleton className="h-[145px] rounded-xl" />
            <Skeleton className="h-[145px] rounded-xl" />
          </div>
        </div>

        {/* Text */}
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
    <div className="max-w-7xl w-full space-y-6  md:mt-2 mb-[150px] lg:mb-0   lg:px-0">
      <div className="flex  gap-4 flex-row sm:items-center items-center justify-between">
        <h1 className="text-xl font-semibold break-words leading-tight">
          {data?.title}
        </h1>

        <div className="flex gap-2">
          <CommunityShareStore paramsId={data?.id} />
          {/* <Button className="rounded-full" variant="outline">
            <FaChartArea /> Analytics
          </Button> */}
        </div>
      </div>

      {/* Mobile Slider */}
      <MobileImageSlider images={allImages} />

      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopImageGrid
          banner={data?.bannerImageUrl || ""}
          images={data?.images?.map((img) => img.url) || []}
        />

        <Heading
          title={`${data?.storeSize?.replace(/store/i, "size")} in ${data?.city}`}
          className="mb-2 mt-4"
        />

        <span className="text-sm text-gray-500"></span>

        <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-8">
          <People description={data?.peopleDesc} />
          <div className="hidden lg:block">
            <div
              className="sticky top-24 border border-gray-200 dark:border-gray-700 
                  bg-white dark:bg-black
                  rounded-2xl shadow-sm p-6 space-y-5 "
            >
              {/* Discount + Price */}
              <div className="space-y-1">
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white leading-none">
                    ₹{data?.priceInr}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">/month</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700"></div>

              {/* Offers Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-orange-600">
                  Save Extra with 3 offers
                </h3>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-black dark:text-white">
                    Cashback:
                  </span>{" "}
                  Get 5% back with select bank cards.
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-black dark:text-white">
                    Bank Offer:
                  </span>{" "}
                  7.5% Instant Discount on EMI transactions.
                </div>
              </div>

              {/* CTA Button */}
              {/* {isOwner ? (
                <Editbutton id={store?.id} />
              ) : (
                <ChatPartnerButton storeId={store?.id} />
              )} */}
              <Link href={`/dashboard/communitystore/findpartner/${id}`}>
                <Button className="w-full py-3 rounded-2xl items-center px-5">
                  <Search className="w-5 h-5 mr-2"/> Search For Partner
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <LocationMap
          lat={data?.latitude}
          lng={data?.longitude}
          city={data?.city}
          state={data.state}
        />
      </div>
    </div>
  );
};

export default CommunityStore;
