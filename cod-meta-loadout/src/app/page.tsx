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
  const [expandedWeaponIndexes, setExpandedWeaponIndexes] = useState<number[]>([]);

  const toggleDropdown = (index: number) => {
    setExpandedWeaponIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const filteredWeapons = weapons
    .filter((weapon) => weapon.type.toLowerCase() === selectedType.toLowerCase())
    .sort((a, b) => a.rank - b.rank);

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] animated-gradient">

      {/* Header */}
      <header className="relative h-40 w-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
        <Image
          src="/call-of-duty-warzone-4k-kzetz7h7t75073ye.jpg"
          alt="Cool header effect"
          fill
          className="object-cover opacity-30"
        />
      </header>

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-red-orange via-red-500  shadow-md sticky top-0 z-10">
        <ul className="flex whitespace-nowrap overflow-x-auto no-scrollbar justify-start sm:justify-center gap-4 p-4 text-lg font-medium text-white">
          {weaponTypes.map((type) => (
            <li key={type}>
              <button
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-md transition ${
                  selectedType === type ? "bg-white text-black" : "hover:bg-white/20"
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 sm:p-20 flex flex-col gap-8 items-center w-full">
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {filteredWeapons.map((weapon, index) => {
            const isExpanded = expandedWeaponIndexes.includes(index);

            return (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md rounded-lg p-4 w-full flex flex-col gap-2"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
                  <div>
                    <h2 className="text-xl font-semibold">{weapon.name}</h2>
                    <p className="text-sm">Type: {weapon.type}</p>
                    <p className="text-sm">Game: {weapon.game}</p>
                    <p className="text-sm">Rank: {weapon.rank}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {weapon.weapon_img && (
                      <Image
                        src={weapon.weapon_img}
                        alt={weapon.name}
                        width={150}
                        height={100}
                        className="rounded-md object-contain"
                      />
                    )}
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-white hover:bg-white/20 p-2 rounded-md text-xl transition"
                      aria-label="Toggle weapon details"
                    >
                      {isExpanded ? "▲" : "▼"}
                    </button>
                  </div>
                </div>

                {/* Attachments list */}
                {isExpanded && weapon.attachments && weapon.attachments.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm text-white pl-4 space-y-1">
                    {weapon.attachments.map(
                      (
                        attachment: { category?: string; name?: string } | string,
                        i: number
                      ) => {
                        // Determine display text
                        if (typeof attachment === "string") {
                          return <li key={i}>{attachment}</li>;
                        } else {
                          const category = attachment.category
                            ? `${attachment.category}: `
                            : "";
                          const name = attachment.name || "Unnamed attachment";
                          return (
                            <li key={i}>
                              <strong>{category}</strong>
                              {name}
                            </li>
                          );
                        }
                      }
                    )}
                  </ul>
                )}

                {isExpanded && (!weapon.attachments || weapon.attachments.length === 0) && (
                  <p className="mt-2 text-sm text-white pl-4 italic">
                    No attachments available
                  </p>
                )}
              </div>
            );
          })}
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
