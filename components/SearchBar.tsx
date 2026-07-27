"use client";

import React from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, onChange }: Props) {
  const [isExpandedSearch, setIsExpandedSearch] = useState(true);

  useEffect(() => {
    const checkWidth = () => setIsExpandedSearch(window.innerWidth > 440);
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <div className={clsx("flex items-center w-full max-w-4xl mb-16")}>
      <input
        type="text"
        placeholder={
          isExpandedSearch ? "Search for a Song, Artist or Album..." : "Search..."
        }
        className={clsx(
          "bg-white/10 backdrop-blur-md w-full text-zinc-200",
          "placeholder:text-zinc-400",
          "border border-zinc-400/40 shadow-black p-2.5 pr-10 rounded-md",
          "focus:outline-none  focus:border-emerald-500",
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className={clsx("text-zinc-400 pointer-events-none -ml-8")} />
    </div>
  );
}

export default SearchBar;
