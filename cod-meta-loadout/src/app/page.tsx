"use client";

import Image from "next/image";
import { useState } from "react";
import weapons from "../data/warzone_weapons.json";

const weaponTypes = [
  "Assault Rifle",
  "Battle Rifle",
  "SMG",
  "Shotgun",
  "LMG",
  "Marksmen Rifle",
  "Sniper",
];

export default function Home() {
  const [selectedType, setSelectedType] = useState("Assault Rifle");

  const filteredWeapons = weapons.filter(
    (weapon) => weapon.type.toLowerCase() === selectedType.toLowerCase()
  );

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="relative h-64 w-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
        <Image
          src="/call-of-duty-warzone-4k-kzetz7h7t75073ye.jpg"
          alt="Cool header effect"
          fill
          className="object-cover opacity-30"
        />
        
      </header>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md sticky top-0 z-10">
        <ul className="flex flex-wrap justify-center gap-4 p-4 text-lg font-medium text-white">
          {weaponTypes.map((type) => (
            <li key={type}>
              <button
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-md transition ${
                  selectedType === type
                    ? "bg-white text-black"
                    : "hover:bg-white/20"
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 sm:p-20 flex flex-col gap-8 items-center sm:items-start w-full">
  

  <div className="flex flex-col gap-4 w-full max-w-4xl">
    {filteredWeapons.map((weapon, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 w-full"
      >
        <h2 className="text-xl font-semibold text-gray-800">{weapon.name}</h2>
        <p className="text-sm text-gray-500">Type: {weapon.type}</p>
        <p className="text-sm text-gray-500">Game: {weapon.game}</p>
      </div>
    ))}
  </div>
</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-md w-full p-4 flex justify-center items-center text-white">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/jaren-burks-7b961323b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/LinkedIn.png"
            alt="LinkedIn logo"
            width={16}
            height={16}
          />
          Jaren Burks
        </a>
      </footer>
    </div>
  );
}
