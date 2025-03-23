"use client";

import Typewriter from "typewriter-effect";
import Footer from "@/components/Footer/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center">
      <div className="my-8 animate-fade-in">
        <ul className="flex items-center justify-center gap-4 md:text-xl">
          <Link
            href="/whitepaper"
            className="text-lg font-medium duration-500 text-[#f85bf0] hover:text-[#ff48f6] underline decoration-pink-300"
          >
            Whitepaper
          </Link>
        </ul>
      </div>

      <div className="w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-[#fc03f0]/0 via-[#fc03f0]/50 to-[#fc03f0]/0" />

      <h1 className="py-3.5 px-0.5 z-10 font-bold text-7xl md:text-8xl lg:text-9xl duration-1000 text-[#fc03f0]/80 cursor-default animate-title font-display whitespace-nowrap">
        ramicoin
      </h1>

      <div className="w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-[#fc03f0]/0 via-[#fc03f0]/50 to-[#fc03f0]/0" />

      {/* Typing Effect */}
      <div className="my-4 animate-fade-in text-xl font-medium text-[#fd3ff4]/80 md:text-2xl flex">
        <span className="mr-2">We</span>
        <span className="font-semibold">
          <Typewriter
            options={{
              strings: ["Trade Bitcoin and Gold,", "Make Profits,", "Distribute."],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </div>

      <div className="mt-[5dvh] animate-fade-in">
        <Link href="/launch">
          <button className="px-4 py-2 bg-[#fd3ff4] text-white font-medium
              cursor-pointer transition-all rounded-lg text-xl
              border-[#f281f8] border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
            Launch App
          </button>
        </Link>
      </div>
      
      <div className=" animate-fade-in">
        <Footer />
      </div>

    </div>
  );
}
