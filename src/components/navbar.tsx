'use client'

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./theme-toggler";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <>
      <motion.header
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3, ease: "easeInOut" }}
      className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-1 w-fit h-fit ml-4">
          <Image src={"/SyncSphere.svg"} className="dark:invert" alt="name" width={75} height={75} />
          <h1 className="text-lg font-bold font-serif">Sync.Sphere</h1>
        </Link>
        <div className="px-5 space-x-2 flex items-center">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
          <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal" />
          </SignedOut>
        </div>
      </motion.header>
    </>
  );
}
