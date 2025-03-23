import Footer from "@/components/Footer/footer";
import Link from "next/link";

export default function Home() {
    return (
        <div className="relative w-[100dvw] min-h-[100dvh] flex flex-col justify-center items-center">
            <div className="my-8 animate-fade-in">
                <ul className="flex items-center justify-center gap-4">

                    <Link
                        href="/"
                        className="text-md duration-500 text-zinc-700 hover:text-[#fc03f0] underline decoration-pink-300"
                    >
                        Home
                    </Link>
                </ul>
            </div>


            <h1 className="py-3 px-0.5 z-10 font-bold text-6xl text-transparent bg-[#fc03f0]/60 cursor-default text-edge-outline font-display whitespace-nowrap bg-clip-text ">
                404
            </h1>
            <h1 className="py-3 px-0.5 z-10 font-bold text-4xl text-transparent bg-[#fc03f0]/60 cursor-default text-edge-outline font-display whitespace-nowrap bg-clip-text ">
                Not Found
            </h1>
            <div className=" animate-fade-in">
                <Footer />
            </div>
        </div>
    );
}
