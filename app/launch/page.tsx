import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Ramicoin.com.",
  openGraph: {
      images: [
          {
              url: "https://ramicoin.com/metadata/home.png",
              width: 1200,
              height: 630,
          },
      ],
  },
};

const actions = ["Swap", "Stake", "Play", "Investor"];

export default function Home() {
  return (
    <div className="relative w-[100dvw] min-h-[100dvh] flex flex-col items-center">
      {/* Capital Section */}
      <div className="mt-[20dvh] text-center space-y-2">
        <h3 className="font-light text-2xl">Trading Capital</h3>
        <h1 className="text-5xl font-bold text-[#fd3ff4] lg:text-7xl">$5,000,000</h1>
      </div>

      {/* Down Arrow */}
      <div className="opacity-45 mt-[5dvh]">
        <Image src="/down.svg" alt="down" width={50} height={50} />
      </div>

      {/* Action Buttons */}
      <div className="mt-[7dvh] grid grid-cols-2 gap-2">
        {actions.map((action, index) => (
          <Link key={index} href={`/${action.toLowerCase()}`} passHref>
            <button
              className="w-32 h-32 bg-white text-black rounded-lg flex justify-center items-center cursor-pointer transition-all border-[#f003fc]/70 
                border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] 
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              <h2 className="text-2xl">{action}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
