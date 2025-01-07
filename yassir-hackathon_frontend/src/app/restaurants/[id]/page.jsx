"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Star, Sparkles } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const COLORS = ["#4ade80", "#f87171"];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/restaurants/",
          { id }
        );
        setRestaurant(data);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };
    fetchRestaurants();
  }, [id]);

  const counts = restaurant.predictions
    ? restaurant.predictions.reduce(
        (acc, val) => {
          if (val === 0) acc.negative++;
          else if (val === 1) acc.positive++;
          return acc;
        },
        { positive: 0, negative: 0 }
      )
    : { positive: 0, negative: 0 };

  const feedbackData = [
    { name: "Feedbacks Positifs", value: counts.positive },
    { name: "Feedbacks Négatifs", value: counts.negative },
  ];

  const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <div className="relative w-5 h-5">
            <Star className="absolute w-5 h-5 text-gray-300" />
            <div className="absolute w-[50%] overflow-hidden">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({roundedRating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <main className="w-full bg-my-gray pb-8">
      <div className="w-full py-4 bg-my-purple flex items-center justify-between px-4">
        <img src="/white_logo.svg" className="h-8" alt="Logo" />
        <p className="text-white text-sm font-bold">
          Découvrir de nouveaux restaurants 🚀
        </p>
      </div>
      <div className="p-8 flex flex-row justify-between">
        <div className="">
          <h3 className="text-4xl ">{restaurant.name}</h3>
          <p className="ml-4">{restaurant.localisation}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row space-x-4">
            <label htmlFor="star">Rating :</label>
            <StarRating id="star" rating={restaurant?.avgRating || 0} />
          </div>
          <div className="flex flex-row space-x-4">
            <label htmlFor="range">Prediction</label>
            <div id="range" className="flex items-center gap-2">
              <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${restaurant?.score || 0}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-600">
                {(restaurant?.score || 0).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-my-purple text-white px-4 py-1 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-xl font-bold">
              Feedback about the restaurant based on comments:
            </p>
            {restaurant.feedback}
          </div>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-my-purple text-white px-4 py-1 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="mt-4 text-gray-700">
            <p className="text-xl font-bold">
              Recommendation for Yassir regarding the restaurant:
            </p>
            {restaurant.recomendation}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-[40%]  rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Distribution des Feedbacks
            </h2>
          </div>

          <div className="h-64 ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feedbackData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {feedbackData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div className="rounded bg-green-100 p-2">
              <p className="text-sm text-gray-600">Total Positifs</p>
              <p className="text-xl font-bold text-green-600">
                {feedbackData[0].value}
              </p>
            </div>
            <div className="rounded bg-red-100 p-2">
              <p className="text-sm text-gray-600">Total Négatifs</p>
              <p className="text-xl font-bold text-red-600">
                {feedbackData[1].value}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 w-full max-w-2xl mx-auto p-4">
        {restaurant.texts &&
          restaurant.texts.map((text, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-700 leading-relaxed flex-1">{text}</p>
                {/* <p>{restaurant.predictions[index]}</p> */}
                <span
                  className={`text-2xl ${
                    restaurant.predictions[index] === 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                  role="img"
                  aria-label={
                    restaurant.predictions[index] === 0 ? "sad" : "happy"
                  }
                >
                  {restaurant.predictions[index] === 0 ? "😞" : "😊"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default RestaurantDetails;
