"use client";

import { useState } from "react";
import { useAccount } from 'wagmi';
import { useAppKit } from "@reown/appkit/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { isConnected, address } = useAccount();
    const { open } = useAppKit();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuIcon, setMenuIcon] = useState("/menu.svg");
    const pathname = usePathname();

    const formattedAddress = (address: string | undefined) => {
        return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : null;
    };

    const handleConnectWallet = () => {
        open();
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setMenuIcon(isMenuOpen ? "/menu.svg" : "/heart.svg");
    };

    const toggleCross = () => {
        setMenuIcon("/menu.svg");
        setIsMenuOpen(false);
    }

    return (
        <>
            <nav className="z-50 flex justify-between items-center px-2 pt-8 pb-8 h-[10dvh] w-[100dvw] top-0 left-0 fixed transition-all duration-300 backdrop-blur-3xl bg-pink-100/30">

                <button onClick={toggleMenu} className="flex justify-between items-center lg:hidden">
                    <Image className="opacity-70" src={menuIcon} alt="menu" width={50} height={50} priority />
                </button>

                <div className="hidden lg:flex lg:justify-start lg:items-center lg:space-x-6">
                    <Link href="/" className="cursor-pointer">
                    <Image className="opacity-70" src="/heart.svg" alt="logo" width={50} height={50} priority />
                    </Link>

                    {/* Navigation Links with active underline */}
                    <ul className="hidden lg:flex lg:justify-start lg:items-start space-x-6 text-lg font-medium">
                        <li>
                            <Link href="/" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/swap" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/swap' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Presale
                            </Link>
                        </li>
                         <li>
                            <Link href="/stake" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/stake' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Stake
                            </Link>
                        </li>
                         <li>
                            <Link href="/refer" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/refer' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Refer & Earn
                            </Link>
                        </li>
                         <li>
                            <Link href="/refer/dashboard" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/dashboard' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/live" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/live' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Live Stream
                            </Link>
                        </li>
                        <li>
                            <Link href="/play" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/play' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Play
                            </Link>
                        </li>
                       
                        <li>
                            <Link href="/contact" className={`text-[#fd3ff4]/90 hover:text-[#ec2df7] ${pathname === '/contact' ? 'underline decoration-4 underline-offset-8' : ''}`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-between items-center lg:mr-[1dvw]">
                    <button onClick={handleConnectWallet} className="px-4 py-2 bg-[#fd3ff4] text-white font-medium
              cursor-pointer transition-all rounded-lg
              border-[#f281f8] border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                        {isConnected ? formattedAddress(address) : "Connect Wallet"}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <div className={`z-50 lg:hidden fixed bottom-0 left-0 w-full bg-gradient-to-b from-[#fcd3f3] to-[#f970f2] shadow-lg p-8 transition-transform duration-300 h-[80dvh] rounded-t-2xl border-t-8 border-[#fd3ff4]
                ${isMenuOpen ? "translate-y-0" : "translate-y-full"}`}>
                <button onClick={toggleCross} className="absolute right-10 top-10 bg-[#fd3ff4]/80 rounded-full">
                    <Image src="/cross.svg" alt="cross" width={50} height={50} />
                </button>
                <ul className="mt-20 space-y-2 text-lg text-white">
                    <div className="space-y-2 font-medium">
                    <div className="w-full flex justify-start items-center space-x-1">
                            <li className="w-[30%]">
                                <Link onClick={toggleCross} href="/" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="flex justify-center items-center w-full bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-4 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Home
                                    </button>
                                </Link>
                            </li>
                            <li className="w-[70%]">
                                <Link onClick={toggleCross} href="/refer/dashboard" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="w-full flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-4 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Dashboard
                                    </button>
                                </Link>
                            </li>
                        </div>
                        <div className="w-full flex justify-start items-center space-x-1">
                            <li className="w-1/2">
                                <Link onClick={toggleCross} href="/swap" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="flex justify-center items-center w-full bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-3 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Presale
                                    </button>
                                </Link>
                            </li>
                            <li className="w-1/2">
                                <Link onClick={toggleCross} href="/play" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="w-full flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-3 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Play
                                    </button>
                                </Link>
                            </li>
                        </div>
                        <div className="w-full flex justify-start items-center space-x-1">
                            <li className="w-full">
                                <Link onClick={toggleCross} href="/stake" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="w-[30dvw] flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-3 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Stake
                                    </button>
                                </Link>
                            </li>
                            <li className="w-full">
                                <Link onClick={toggleCross} href="/contact" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="w-[30dvw] flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-3 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Contact
                                    </button>
                                </Link>
                            </li>
                            <li className="w-full">
                                <Link onClick={toggleCross} href="/live" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                    <button className="w-full flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-3 font-semibold
              cursor-pointer transition-all text-xl
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                        Live
                                    </button>
                                </Link>
                            </li>
                        </div>
                    </div>
                    <div className="w-full font-semibold">
                        <li className="w-full">
                            <Link onClick={toggleCross} href="/refer" className="w-full cursor-pointer hover:text-[#f47ffa]">
                                <button className="w-full flex justify-center items-center bg-[#ffffff] rounded-md text-[#fd3ff4]/90 px-4 py-6 font-bold text-2xl
              cursor-pointer transition-all
              border-[#ec2df7]/80 border-b-[4px] hover:brightness-110
              hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
              active:brightness-90 active:translate-y-[2px]">
                                    Refer & Earn
                                </button>
                            </Link>
                        </li>
                    </div>
                    <div className="flex justify-start items-center space-x-3">
                        <Link href="https://x.com/ramicoin_bnb" target="blank">
                            <Image src="/wtwt.svg" alt="twitter" width={40} height={40} />
                        </Link>
                        <Link href="https://youtube.com/@ramicoin" target="blank">
                            <Image src="/wyt.svg" alt="youtube" width={50} height={50} />
                        </Link>
                    </div>
                </ul>
            </div>
        </>
    );
}
