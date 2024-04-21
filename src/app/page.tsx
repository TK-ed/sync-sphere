"use client";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { TextGenerateEffectDemo } from "@/components/ui/TypeWriter";
import Link from "next/link";
import Type from "@/components/typing";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {});
  return (
    <motion.main
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
    >
      <div className="flex flex-col lg:flex-row bg-[#1E1919] dark:bg-slate-800 items-center mt-1">
        <div className="flex flex-col bg-[#2b2929] p-10 space-y-5 text-white dark:bg-slate-800">
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-100 inline-block text-transparent bg-clip-text">
            <Type />
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            <br />
            Where Your Data Finds Harmony in the Cloud.
          </h1>
          <TextGenerateEffectDemo />
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-4">Embrace Sync.Sphere!!</h3>
          <Link
            href={"/dashboard"}
            className="flex items-center p-5 cursor-pointer bg-blue-600 w-fit"
          >
            Try it for free!
            <ArrowRightIcon className="ml-5" />
          </Link>
        </div>
        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-xl">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser doesnt support video tag
          </video>
        </div>
      </div>
    </motion.main>
  );
}
