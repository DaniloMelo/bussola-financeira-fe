"use client";

import Container from "../Container";
import ThemeSelector from "../ThemeSelector";

export default function Header() {
  return (
    <header className="bg-emerald-900 sticky top-0 z-50">
      <Container>
        logo
        <ThemeSelector />
      </Container>
    </header>
  );
}
