"use client";

import ButtonTemp from "@/components/ButtonTemp";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <ButtonTemp
        onClick={() => {
          console.log("asd");
        }}
        variant="primary"
      >
        click
      </ButtonTemp>
    </div>
  );
}
