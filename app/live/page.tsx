import { Metadata } from "next";
import Footer from "@/components/Footer/footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Live Streaming",
    description: "Join the trading session live on ramicoin's official youtube channel.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/live.png",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function Home() {
    return (
        <div className="relative w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center">
            <h1 className="font-bold text-5xl flex justify-center items-center">
                Youtube Live
            </h1>
                        <Link href="https://www.youtube.com/@ramicoin" target="blank">
            <button className="mt-[5dvh] mb-[5dvh] py-2 px-4 bg-[#f47ffa] text-white text-xl font-normal
          cursor-pointer transition-all rounded-lg
          border-[#f458fc]/60 
          border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Join Now</button>
                            </Link>
            <Footer />
        </div>
    );
}
