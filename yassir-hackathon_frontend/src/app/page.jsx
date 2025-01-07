"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [form, setForm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/restaurants`);

    // Submit handler logic here
  };

  return (
    <main className="min-h-screen">
      <div className="w-full py-4 bg-my-purple flex items-center justify-between px-4">
        <img src="./white_logo.svg" className="h-8" alt="Logo" />
        <p className="text-white text-sm font-bold">
          Découvrir de nouveuax restaurants 🚀
        </p>
      </div>

      <div className="w-full flex">
        <div className="w-full lg:w-[55%] px-4 py-8 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
          <div className="space-y-3 mb-8">
            <h3 className="text-4xl lg:text-6xl font-bold leading-tight">
              Découvrez de
            </h3>
            <h3 className="text-3xl lg:text-5xl font-bold text-my-purple leading-tight">
              nouveaux restaurants
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <input
              value={form}
              onChange={(e) => setForm(e.target.value)}
              type="text"
              required
              placeholder="Donner le nom de la region"
              className="w-full lg:w-[80%] px-4 py-3 text-black bg-transparent outline-none border border-black rounded-lg focus:border-my-purple focus:ring-1 focus:ring-my-purple"
            />

            <button
              className="w-full lg:w-auto lg:px-12 py-3 text-white font-medium bg-my-purple hover:bg-opacity-90 active:bg-opacity-100 rounded-lg duration-150"
              type="submit"
            >
              Découvrir
            </button>
          </form>
        </div>

        <div
          className="hidden lg:flex w-[45%] items-center justify-center h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/bg.png')" }}
        >
          <div className="max-w-sm w-full text-gray-600 space-y-5">
            <div className="text-center pb-8" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
