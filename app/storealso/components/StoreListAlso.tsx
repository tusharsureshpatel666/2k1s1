import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const StoreListAlso = ({ lat, log }) => {
  const [types, setTypes] = useState([]);
  const [places, setPlaces] = useState({});

  // 🔹 Get types from backend
  useEffect(() => {
    const handleList = async () => {
      try {
        const res = await axios.post("/api/storealsonearmarket");
        setTypes(res.data.places || []);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };

    handleList();
  }, []);

  // 🔹 Fetch nearby places
  useEffect(() => {
    const fetchNearby = async () => {
      if (!lat || !log || types.length === 0) return;

      try {
        const query = new URLSearchParams({
          lat,
          lng: log,
        });

        // ✅ append all dynamic types
        types.forEach((type) => {
          query.append("type", type);
        });

        const res = await axios.get(`/api/nearbyplaces?${query.toString()}`);

        setPlaces(res.data.groupedResults || {});
      } catch (err) {
        console.error("Error fetching places:", err);
      }
    };

    fetchNearby();
  }, [lat, log, types]);

  return (
    <div>
      <h1 className="text-2xl px-5 py-5">Nearest Market</h1>

      {Object.keys(places)
        .filter((type) => places[type]?.length > 0) // ✅ skip empty
        .map((type) => (
          <div key={type} className="mb-6 px-5">
            {/* 🔹 Type Heading */}
            <h2 className="text-xl font-bold capitalize mb-3">
              {type.replaceAll("_", " ")}
            </h2>

            {/* 🔹 Places List */}
            {places[type].map((place) => (
              <div
                key={place.place_id}
                className="border p-3 my-2 flex items-center gap-3 rounded-xl shadow-sm hover:shadow-md transition"
              >
                {/* ✅ Icon */}
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: place.icon_background_color || "#eee",
                  }}
                >
                  <Image
                  width={50}
                  height={50}
                    src={
                      place.icon_mask_base_uri
                        ? `${place.icon_mask_base_uri}.png`
                        : place.icon
                    }
                    alt={place.name}
                    className="w-5 h-5"
                  />
                </div>

                {/* ✅ Info */}
                <div>
                  <p className="font-semibold text-xs">{place.name}</p>
                  <p className="text-sm text-gray-500">{place.vicinity}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* 🔥 Optional: show message if no places */}
      {Object.keys(places).length > 0 &&
        Object.values(places).every((arr) => arr.length === 0) && (
          <p className="text-center text-gray-500 py-5">
            No places found nearby
          </p>
        )}
    </div>
  );
};

export default StoreListAlso;
