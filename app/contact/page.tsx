import { Metadata } from "next";
import Footer from "@/components/Footer/footer";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Solve your problems in real time.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/contact.png",
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
                Need Help
            </h1>
            <p className="text-xl mt-[3dvh]">We are always active on social media!</p>
            <Footer />
        </div>
    );
}
