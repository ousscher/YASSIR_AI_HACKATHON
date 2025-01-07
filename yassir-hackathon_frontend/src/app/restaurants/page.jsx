"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, StarHalf } from "lucide-react";
import axios from "axios";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/restaurants/");
        // Simulez un délai de 2 secondes
        setTimeout(() => {
          setRestaurants(data);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
    fetchRestaurants();
  }, []);

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-5 h-5 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <main className="w-full bg-my-gray pb-8">
      {/* Spinner si les données sont en cours de chargement */}
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="w-full py-4 bg-my-purple flex items-center justify-between px-4">
            <img src="./white_logo.svg" className="h-8" alt="Logo" />
            <p className="text-white text-sm font-bold">
              Découvrir de nouveaux restaurants 🚀
            </p>
          </div>

          <h3 className="mt-4 ml-8 text-3xl font-bold leading-tight">
            {restaurants.length} restaurants dans la région Sidi Abdellah :
          </h3>
          <div className="flex flex-col items-center mt-4 space-y-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="w-[80%] bg-white p-4 rounded-lg shadow-md flex flex-col items-start md:flex-col md:justify-between"
              >
                <div className="flex flex-row w-full">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-my-purple">{restaurant.name}</h4>
                    <p className="text-gray-600 mt-2">{restaurant.localisation}</p>
                  </div>
                  <div className="mt-2">
                    <StarRating rating={restaurant.avgRating} />
                  </div>
                </div>
                <div className="w-full mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      router.push(`/restaurants/${restaurant.id}`);
                    }}
                    className="px-8 py-1 bg-my-purple text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Restaurants;
