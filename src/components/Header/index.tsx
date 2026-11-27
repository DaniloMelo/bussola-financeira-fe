import Link from "next/link";
import Container from "../Container";
import Image from "next/image";

export default function Header() {
  return (
    <header className="top-0 z-50 bg-secondary-background dark:bg-secondary-background shadow-sm">
      <Container className="p-1 lg:p-1">
        <Link href="/dashboard">
          <Image
            src="https://res.cloudinary.com/dyvingiy9/image/upload/v1777750834/bussola-financeira-logo_dtuflh.png"
            height="50"
            width="50"
            alt="Bússola financeira logo"
          />
        </Link>
      </Container>
    </header>
  );
}

// pl-0 lg:pl-0 py-0 lg:py-0
