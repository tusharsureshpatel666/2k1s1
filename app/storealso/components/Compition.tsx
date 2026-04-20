import axios from "axios";
import React, { useEffect, useState } from "react";

interface Comp {
  lat: number;
  lng: number;
  bussinessType: string;
}

interface Place {
  name: string;
  vicinity: string;
  rating?: number;
}

const Compition = ({ lat, lng, bussinessType }: Comp) => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.post("/api/comp", {
          params: {
            lat,
            lng,
            bussinessType,
          },
        });
        console.log(response.data)
        // const data = await response.json();
        // setPlaces(data.results);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [lat, lng, bussinessType]);

  return (
    <div>
      <h2>Nearby {bussinessType}</h2>

      {places.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {places.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong>
              <br />
              {place.vicinity}
              <br />
              ⭐ {place.rating || "No rating"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Compition;