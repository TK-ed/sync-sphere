import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./theme-toggler";

export default function Navbar() {
  return (
    <>
      <header className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-1">
          <Image src={"/logo.png"} alt="name" width={70} height={70} />
          <h1 className="text-lg font-bold font-serif">Sync.Sphere</h1>
        </Link>
        <div className="px-5 space-x-2 flex items-center">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>
        </div>
      </header>
    </>
  );
}
