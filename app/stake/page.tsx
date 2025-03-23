import { Metadata } from "next";
import StakingPage from "@/components/Stake";

export const metadata: Metadata = {
    title: "Staking",
    description: "Stake Ramicoins and earn passive income in USDT.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/stake.png",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function Home() {
    return (
        <>
            <StakingPage />
        </>
    )
}