"use client";

import { useState } from "react";
import Heading from "@/app/dashboard/components/heading";
import { Input } from "@/components/ui/input";
import CountrySelect from "./country";

type Props = {
  flatNo: string;
  setFlatNo: (v: string) => void;
  street: string;
  setStreet: (v: string) => void;
  nearby: string;
  setNearby: (v: string) => void;
  district: string;
  setDistrict: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  state: string;
  Sstate: (v: string) => void;
  pin: string;
  setPin: (v: string) => void;
};

const LocationPicker = ({
  flatNo,
  setFlatNo,
  street,
  setStreet,
  nearby,
  setNearby,
  district,
  setDistrict,
  city,
  setCity,
  country,
  setCountry,
  state,
  Sstate,
  pin,
  setPin,
}: Props) => {
  const [loading, setLoading] = useState(false);

  // 🟢 Get Current Location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        reverseGeocode(latitude, longitude);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve location. Please allow permission.");
        setLoading(false);
      },
    );
  };

  // 🟢 Reverse Geocoding (OpenStreetMap - FREE)
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );

      const data = await res.json();

      if (data && data.address) {
        const address = data.address;
        console.log(address);

        setStreet(address.road || "");
        setDistrict(address.suburb || address.village || "");
        setCity(address.city || address.town || address.village || "");
        Sstate(address.state || "");
        setPin(address.postcode || "");
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      alert("Failed to fetch address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-0 lg:px-4">
      <div className="w-full max-w-2xl space-y-6">
        <Heading
          title="Confirm your address"
          description="Your address is only shared with guests after they've made a reservation."
        />

        {/* 📍 Current Location Button */}
        <button
          type="button"
          onClick={getCurrentLocation}
          className="bg-blue-600 w-full text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Detecting location..." : "Use Current Location"}
        </button>

        <CountrySelect value={country} onChange={setCountry} />

        <div className="rounded-2xl space-y-3">
          <Input
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            placeholder="Flat, house, etc. (if applicable)"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street address"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={nearby}
            onChange={(e) => setNearby(e.target.value)}
            placeholder="Nearby landmark (if applicable)"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="District/locality"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City/town"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={state}
            onChange={(e) => Sstate(e.target.value)}
            placeholder="State/union territory"
            className="h-15 px-5 rounded-xl"
          />

          <Input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN code"
            className="h-15 px-5 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
