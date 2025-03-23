'use client';

import { useEffect, useState } from 'react';
import { useAffiliate } from '@/context/affiliate'
import Image from "next/image";
import Link from "next/link";
import { useAccount } from 'wagmi';
import RedSpinner from '@/components/Spinners/RedSpin';
import { Copy, Check, BanIcon } from "lucide-react";
import { useAppKit } from "@reown/appkit/react";
import ShareModal from '@/components/Modal/ShareModal';


const DashboardComponent = () => {

  const { state: affiliate, isLoading, handleGenerateCode } = useAffiliate()
  const { address: userAddress } = useAccount()
  const [isCopied, setIsCopied] = useState(false)
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const { open } = useAppKit();

  const handleConnectWallet = () => {
    open();
  };

  useEffect(() => {
    setIsCopied(false);
  }, [affiliate.referralLink]);

  const toggleShareMenu = () => setIsShareMenuOpen(!isShareMenuOpen);

  // Add copy handler
  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliate.referralLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      ('Failed to copy link')
    }
  }

  // Fixed referral code display with loading states
  const renderReferralCode = () => {
    if (!userAddress) return <BanIcon size={24} className="text-gray-400" />;

    if (isLoading) {
      return <RedSpinner />;
    }

    if (affiliate.generatedCode) {
      return affiliate.generatedCode;
    }

    return "Geberate New Code"; // Show placeholder when no code exists
  };

  const formatNumber = (num: number) =>
    num?.toLocaleString(undefined, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }) || "0";

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center p-2 bg-gradient-to-b from-pink-50 to-white">
      <div className="w-full max-w-7xl grid bento-grid gap-6 p-2 mt-[15dvh] lg:mt-[20dvh]">
        {/* community */}
        <div className="col-span-4 lg:col-span-8 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-[#fd3ff4]">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl text-[#fd3ff4]/70 font-light">Growing</h3>
                <h1 className="text-4xl pb-2 lg:text-5xl font-bold text-[#fd3ff4]/90">
                  Rami Community
                </h1>
              </div>
              <div className="hidden lg:flex justify-center items-center space-x-4 opacity-75">
                <Image src="/heart.svg" alt="divider" width={24} height={24} />
              </div>
            </div>
            <div className="bg-[#fd3ff4]/10 rounded-2xl p-2 space-y-6 shadow-inner pb-11">
              {/* <Image src="/dash/total-users.svg" alt="logo" width={1000} height={1000} className="mx-auto" /> */}
              <div className="w-full pt-5 flex justify-center items-center perspective-1000">
                <div className="relative w-24 h-24 transform-style-preserve-3d animate-coin-float">
                  {/* Coin Front */}
                  <div className="absolute inset-0 bg-[#fd3ff4]/20 border-2 border-white rounded-full 
                                                            shadow-[0_0_25px_rgba(253,63,244,0.3)] flex items-center justify-center">
                    {/* Solid White Edge Base */}
                    <div className="absolute inset-0 rounded-full border-2 border-white" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-full shadow-inner shadow-[rgba(255,255,255,0.2)]" />

                    {/* Heart Container */}
                    <div className="relative w-20 h-20 bg-[#fd3ff4]/20 border-2 border-white rounded-full flex items-center justify-center transform-gpu transition-transform duration-300               hover:scale-110">
                      <Image
                        src="/heart.svg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="transform-gpu transition-transform duration-200 hover:scale-125"
                      />
                    </div>
                  </div>

                  {/* Coin Edge Filler */}
                  <div className="absolute inset-0 rounded-full transform-gpu translate-z-[-20px] 
                                                            border-2 border-white scale-[0.98]" />
                </div>
              </div>
              <div className=" text-center space-y-2">
                <h2 className="text-2xl text-[#fd3ff4]/90 font-normal">Total Investors</h2>
                <h1 className="text-5xl font-bold text-[#fd3ff4] flex justify-center items-center">
                  {affiliate.totalUsers || "00"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Funds Raised Card */}
        <div className="col-span-4 lg:col-span-8 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-[#fd3ff4]">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl text-[#fd3ff4]/50 font-light">Total</h3>
                <h1 className="text-4xl pb-2 lg:text-5xl font-bold text-[#fd3ff4]/90">
                  Funding Raised
                </h1>
              </div>
              <div className="hidden lg:flex justify-center items-center space-x-4 opacity-75">
                <Image src="/heart.svg" alt="divider" width={24} height={24} />
              </div>
            </div>
            <div className="bg-[#fd3ff4]/10 rounded-2xl p-2 space-y-6 shadow-inner pb-11">
              <div className="w-full pt-6 flex justify-center items-center perspective-1000">
                <div className="relative w-24 h-24 transform-style-preserve-3d animate-coin-float">
                  {/* Coin Front */}
                  <div className="absolute inset-0 bg-green-500/30 border-2 border-white rounded-full 
                                                            shadow-[0_0_25px_rgba(253,63,244,0.3)] flex items-center justify-center">
                    {/* Solid White Edge Base */}
                    <div className="absolute inset-0 rounded-full border-2 border-white" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-full shadow-inner shadow-green-500/30 " />

                    {/* Heart Container */}
                    <div className="relative w-20 h-20 bg-green-500/20  border-2 border-white rounded-full flex items-center justify-center transform-gpu transition-transform duration-300               hover:scale-110">
                      <Image
                        src="/usdt.svg"
                        alt="logo"
                        width={40}
                        height={40}
                        className="transform-gpu transition-transform duration-200 hover:scale-125"
                      />
                    </div>
                  </div>

                  {/* Coin Edge Filler */}
                  <div className="absolute inset-0 rounded-full transform-gpu translate-z-[-20px] 
                                                            border-2 border-white scale-[0.98]" />
                </div>
              </div>
              <div className=" text-center space-y-2">
                <h2 className="text-2xl text-[#fd3ff4]/90 font-normal">Total Volume</h2>
                <h1 className="text-5xl font-bold text-[#fd3ff4] flex justify-center items-center">
                  ${affiliate.totalSales ? affiliate.totalSales : "00"}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="relative col-span-4 lg:col-span-4 bg-white p-2 rounded-3xl shadow-xl border-b-4 border-[#fe3636]">

          {isShareMenuOpen && (
            <ShareModal
              isOpen={isShareMenuOpen}
              onClose={toggleShareMenu}
              referralLink={affiliate.referralLink}
            />
          )}

          <div className="h-full flex flex-col justify-between space-y-6">
            <div className="text-center space-y-6 mt-[2dvh]">
              <h1 className="text-4xl font-bold text-[#fe3636]">Code</h1>
            </div>
            <div className="bg-[#fe3636]/5 rounded-2xl p-2 space-y-6 shadow-inner">
              <Image
                src="/dash/refercode.svg"
                alt="Referral code"
                width={50}
                height={50}
                className="mx-auto mt-[3dvh]"
              />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-normal text-[#fe3636]/80">My Referral Code</h2>
                <h1 className="text-4xl font-bold text-[#fe3636] flex justify-center items-center min-h-[48px]">
                  {renderReferralCode()}
                </h1>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    !userAddress
                      ? handleConnectWallet()
                      : userAddress && affiliate.exists
                        ? toggleShareMenu()
                        : handleGenerateCode()
                  }
                  disabled={isLoading}
                  className="w-[80%] flex justify-center items-center py-4 bg-[#fe3636] text-white rounded-xl font-normal shadow-lg hover:shadow-green-200 text-2xl px-4 cursor-pointer transition-all border-[#f59d9d] border-b-[4px] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {!userAddress ? (
                    <span>Connect Wallet</span>
                  ) : affiliate.exists ? (
                    <span className="flex justify-center items-center gap-2 text-white">
                      <Image src="/share.svg" alt='share' width={24} height={24} />
                      Share
                    </span>
                  ) : isLoading ? (
                    <span className="flex items-center gap-2">
                      <RedSpinner />
                      Generating...
                    </span>
                  ) : (
                    'Generate Code'
                  )}
                </button>

                <button
                  onClick={copyReferralLink}
                  disabled={!userAddress || !affiliate.exists || isLoading}
                  className="w-[20%] flex justify-center items-center py-4 bg-[#fe3636] text-white rounded-xl font-normal shadow-lg hover:shadow-green-200 text-2xl px-4 cursor-pointer transition-all border-[#f59d9d] border-b-[4px] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isCopied ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Copy size={20} className="text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invest Now Card */}
        <div className="col-span-4 lg:col-span-4 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-[#15803d]">
          <div className="h-full flex flex-col justify-between space-y-6">
            <div className="text-center space-y-6 mt-[2dvh]">
              <h1 className="text-4xl font-bold text-[#15803d]">Commission</h1>
            </div>
            <div className="bg-green-50 rounded-2xl p-2 space-y-6 shadow-inner">
              <Image src="/dash/gift.svg" alt="claim" width={60} height={60} className="mx-auto mt-[3dvh]" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-normal text-[#15803d]/80">Per Referral</h2>
                <h1 className="text-4xl font-bold text-green-700 flex justify-center items-center">
                  3%
                </h1>
              </div>
              <Link href="/swap">
                <div className="flex gap-1 mt-[2dvh]">
                  <button className="flex-1 py-4 bg-[#15803d] text-white rounded-xl font-normal shadow-lg text-2xl 
                px-4
                cursor-pointer transition-all
                border-[#55986e] border-b-[4px] hover:brightness-110
                hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
                active:brightness-90 active:translate-y-[2px]">Invest Now</button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Personal Dash Cards */}
        <div className="col-span-4 lg:col-span-4 grid gap-6">
          {/* Earning Card */}
          <div className="bento-card bg-white p-4 rounded-3xl shadow-xl border-b-4 border-[#fd3ff4]">
            <div className="h-full flex flex-col justify-center items-center space-y-4">
              <Image src="/dash/earned.svg" alt="burn" width={60} height={60} />
              <div className="flex flex-col justify-center items-center space-y-1">
                <h2 className="text-2xl font-normal text-[#fd3ff4]/80">My Ramicoin</h2>
                <span className="font-normal text-lg text-[#fd3ff4]">Earnings</span>
              </div>
              <div className="text-4xl font-bold text-[#fd3ff4]/90">
                {affiliate.totalEarnings.toFixed(0) || "0"}
              </div>
            </div>
          </div>

          {/* My Investment */}
          <div className="bento-card bg-white p-8 rounded-3xl shadow-xl border-b-4 border-[#fd3ff4]">
            <div className="h-full flex flex-col justify-center items-center space-y-6">
              <Image src="/dash/invested.svg" alt="reserve" width={60} height={60} />
              <h2 className="text-2xl font-normal text-[#fd3ff4]/80">Total Invested</h2>
              <div className="text-4xl font-bold text-[#fd3ff4]/90">
                {userAddress && affiliate.salesVolume ? affiliate.salesVolume : "0"}
              </div>
            </div>
          </div>
        </div>

        {/* My team */}
        <div className="col-span-4 lg:col-span-4 grid gap-6">
          {/* Referal Count Personal */}
          <div className="bento-card bg-white p-4 rounded-3xl shadow-xl border-b-4 border-[#5d31fb]">
            <div className="h-full flex flex-col justify-center items-center space-y-4 mb-[2dvh]">
              <Image src="/dash/team.svg" alt="burn" width={60} height={60} />
              <div className="flex flex-col justify-center items-center space-y-1">
                <h2 className="text-2xl font-normal text-[#5d31fb]/80">My Team</h2>
                <span className="font-normal text-lg text-[#5d31fb]">Successful Refer</span>
              </div>
              <div className="text-4xl font-bold text-[#5d31fb]/90">
                {affiliate.referralCount || "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;