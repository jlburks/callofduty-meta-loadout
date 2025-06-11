"use client";

import Image from "next/image";
import { useState } from "react";
import weapons from "../data/warzone_weapons.json";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  const [showAd, setShowAd] = useState(true); // Toggle ad box

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
      <SpeedInsights />
      <Analytics />

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
      <nav className="bg-gradient-to-r from-red-orange via-red-500 shadow-md sticky top-0 z-10">
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
                className="bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 text-white shadow-md rounded-lg p-4 w-full flex flex-col gap-2"
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

      {/* Floating Affiliate Product (with close button) */}
      {showAd && (
        <div className="fixed right-2 bottom-4 sm:right-4 sm:top-1/2 sm:transform sm:-translate-y-1/2 z-20 bg-gray-900 text-white p-3 rounded-lg shadow-lg w-60 sm:w-60 w-11/12">

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">🎧 Recommended</h3>
            <button
              onClick={() => setShowAd(false)}
              className="text-white text-xs px-2 hover:text-red-400"
              aria-label="Close ad"
            >
              ✕
            </button>
          </div>
          <a
            href="https://www.amazon.com/Razer-BlackShark-V2-Gaming-Headset/dp/B086PKMZ21?crid=1L8KEYVFR613D&dib=eyJ2IjoiMSJ9.zHoOmh6S7kPeAkWr3bmSFimcZAw3Pp4AqAj53wS5if_YzfHdUUWYmwls6DniHcawnd8HoD-QsnIdtoVAEjUoKJRrmzlHWeydB6o0vz1fHo9QQkWOfrnT4HNBkWYh8GcgtGHw_F66mcTS6ODshkLBnikLZsX73nxUdbE3OOcIADekEJt7T6o9DZSYpa0vIhJR9SJXQ62YCFlFUOIwrANHf1H1sRXofqpYKUZ8evv0gGQ.URPxhN8KXNiHX9i0Ed8ojrJ6eFCoBDmUGfWPFCwu_lE&dib_tag=se&keywords=gaming%2Bheadphones&qid=1749614751&sprefix=gaming%2Bheadphone%2Caps%2C138&sr=8-4&th=1&linkCode=ll1&tag=callofduty2me-20&linkId=d2d2913fbc354186fc99fc11682f45d0&language=en_US&ref_=as_li_ss_tl"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center"
          >
            <img
              src="https://m.media-amazon.com/images/I/51FRJHB7XOL._AC_SX569_.jpg"
              alt="Razer BlackShark V2 X Gaming Headset"
              className="mx-auto rounded-md mb-2"
              width={1000}
              
            />
            <span className="text-red-400 text-sm hover:underline">Buy on Amazon</span>
          </a>
        </div>
      )}
    </div>
  );
}
