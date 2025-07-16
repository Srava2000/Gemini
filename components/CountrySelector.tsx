"use client";
import { useState } from "react";

const countryData = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Japan", code: "+81" },
  { name: "Brazil", code: "+55" },
  { name: "South Africa", code: "+27" },
];

export default function CountrySelector({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  const [countries] = useState(countryData);

  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full bg-white text-black dark:bg-gray-800 dark:text-white rounded"
    >
      <option value="">Select Country</option>
      {countries.map((c, i) => (
        <option key={i} value={c.code}>
          {c.name} ({c.code})
        </option>
      ))}
    </select>
  );
}
