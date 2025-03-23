import Footer from "@/components/Footer/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Investors",
    description: "Connect with the CEO and become the direct investor in the ramicoin.com platform.",
    openGraph: {
        images: [
            {
                url: "https://ramicoin.com/metadata/investor.png",
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
                Invest Directly
            </h1>
            <h3 className="text-xl mt-[2dvh] font-light">Send Us an email</h3>
            <p className="text-xl font-normal mt-[1dvh]">ramicoinbsc@gmail.com</p>
            <Footer />
        </div>
    );
}
