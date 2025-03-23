import { Metadata } from "next";
import AffiliateLandingPage from "@/components/Refer/Landing";

export const metadata: Metadata = {
    title: "Refer and Earn",
    description: "Share and grow with your network and earn more.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/refer.png",
                width: 1200,
                height: 630,
            },
        ],
    },
};

export default function Home() {
    return (
        <AffiliateLandingPage />
    );
}
