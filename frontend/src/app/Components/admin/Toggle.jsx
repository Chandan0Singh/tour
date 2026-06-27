"use client";

import { useState } from "react";

export default function Toggle({ label }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>

      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`h-6 w-12 rounded-full ${
          enabled ? "bg-green-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`h-5 w-5 rounded-full bg-white transition-all ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}