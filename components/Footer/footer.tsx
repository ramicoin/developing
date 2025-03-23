import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <div className="flex justify-center items-center space-x-2 mt-[4dvh]">
            <Link href="https://x.com/ramicoin_bnb" target="blank" className="flex justify-center items-center w-8 h-8 z-20">
                <Image src="/twt.svg" alt="twitter" width={50} height={50} />
            </Link>
            <Link href="https://youtube.com/@ramicoin" target="blank" className="flex justify-center items-center w-10 h-10 z-20">
                <Image src="/yt.svg" alt="telegram" width={50} height={50} />
            </Link>
        </div>
    )
}
