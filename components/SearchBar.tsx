"use client";

import React, { use } from "react";
import clsx from "clsx";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

type Props = {};

function SearchBar({}: Props) {
  const [isExpandedSearch, setIsExpandedSearch] = useState(
    window.innerWidth > 440,
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkWidth = () => setIsExpandedSearch(window.innerWidth > 440);
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <div className={clsx("flex items-center w-full max-w-md")}>
      <input
        type="text"
        placeholder={
          isExpandedSearch ? "Search for a Song, Artist or Album..." : "Search..."
        }
        className={clsx(
          "bg-zinc-100/20 backdrop-blur-md w-full text-zinc-200",
          "placeholder:text-zinc-400",
          "border border-zinc-400 shadow-black p-2.5 pr-10 rounded-md",
          "focus:outline-none  focus:border-emerald-500 focus:border-2",
        )}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Search className={clsx("text-zinc-400 pointer-events-none -ml-8")} />
    </div>
  );
}

export default SearchBar;
