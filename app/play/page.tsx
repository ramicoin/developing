import { Metadata } from "next";
import Footer from "@/components/Footer/footer";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Play",
    description: "Have fun and use your analysis skill to boost your Ramicoin portfolio.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/play.png",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function Home() {
    return (
        <div className="relative w-screen min-h-screen flex flex-col items-center p-2">
            <div className="text-center space-y-2 mt-[23dvh] lg:mt-[25dvh]">
                <h3 className="lg:hidden font-bold text-4xl text-gray-800">Analyze & Win</h3>
                <h3 className="hidden lg:block font-bold text-5xl text-gray-800">Analye, Predict & Win</h3>
            </div>


            {/* lg screens */}
            <div className="hidden lg:flex lg:flex-col lg:justify-center lg:items-center mt-[2dvh] lg:mb-[4dvh]">
                <Image src="/play.svg" alt="play" width={200} height={200} />
                <h2 className="text-2xl font-normal">coming soon</h2>
            </div>

            {/* Play */}
            <div className="lg:hidden flex flex-col justify-center items-center mt-[4dvh] mb-[4dvh]">
                <Image src="/play.svg" alt="play" width={140} height={140} />
                <h2 className="text-2xl font-normal">coming soon</h2>
            </div>

            <Footer />
        </div>
    );
}
