import { Metadata } from "next";
import DownloadButton from "@/components/downloadWhitepaper";

export const metadata: Metadata = {
    title: "Whitepaper",
    description: "Learn in detail about the RamiCoin platform & its business.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/whitepaper.png",
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
                Whitepaper
            </h1>
            <p className="text-xl mt-[3dvh]">ramicoin.com</p>
            <DownloadButton />
        </div>
    );
}
