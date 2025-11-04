"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="border-2 rounded-md py-5 px-10">
      <h1 className="text-center mb-10 text-2xl">{count}</h1>

      <button
        className="p2 bg-red-800 w-10 h-8 rounded-md text-2xl mr-2"
        onClick={() => setCount((prev) => prev - 1)}
      >
        -
      </button>
      <button
        className="p2 bg-blue-800 w-10 h-8 rounded-md text-2xl ml-2"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </button>
    </div>
  );
}
