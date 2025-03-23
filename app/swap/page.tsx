import { Metadata } from "next";
import PresalePage from "@/components/Presale";

export const metadata: Metadata = {
    title: "Buy Ramicoin",
    description: "Buy and Sell ramicoins anytime, anywhere and any amount.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/buy.png",
                width: 1200,
                height: 630,
            },
        ],
    },
};
export default function Home() {
    return (
        <>
            <PresalePage />
        </>
    )
}