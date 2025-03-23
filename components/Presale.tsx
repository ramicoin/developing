'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import PinkSpinner from '@/components/Spinners/PinkSpin'
import { useAffiliate } from '@/context/affiliate'
import WhiteSpinner from './Spinners/WhiteSpinner'
import RedSpinner from './Spinners/RedSpin'
import { useRef } from 'react'

export default function PresalePage() {
    const { address: userAddress } = useAccount()
    const {
        state: affiliate,
        isAmountValid,
        isRamiAmountValid,
        isLoading,
        handlePurchase,
        handleUSDTChange,
        handleRAMIChange,
        handleReferralCodeChange,
        handleApproveUSDT
    } = useAffiliate()

    const needsApproval = parseFloat(affiliate.usdtAmount) > affiliate.allowance
    const referralContainerRef = useRef<HTMLDivElement>(null)
    const usdtContainerRef = useRef<HTMLDivElement>(null)
    const ramiContainerRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()

    useEffect(() => {
        const referralCode = searchParams.get('referral')
        if (referralCode) {
            handleReferralCodeChange(referralCode)
        }
    }, [searchParams, handleReferralCodeChange])

    const handleInputFocus = (ref: React.RefObject<HTMLDivElement>) => {
        setTimeout(() => {
            ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    }

    return (
        <div className="relative w-screen min-h-screen flex flex-col items-center p-2 lg:p-4 mb-[8dvh]">
            <div className="mt-[20dvh] inline-flex px-4 py-2 bg-[#fd3ff4]/10 rounded-full backdrop-blur-sm mb-[3dvh]">
                <span className="text-lg font-semibold text-[#fd3ff4]">
                    <span className='font-normal text-sm'>1 RAMI =</span> $0.005
                    <span className='font-normal text-sm'>USDT</span>
                </span>
            </div>

            <div className="w-full max-w-md lg:mb-[3dvh] p-4 lg:p-4 rounded-lg shadow-md mt-6 space-y-2 bg-[#fd3ff4]/10">
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-2xl font-semibold text-[#fd3ff4]">Presale Live</h2>
                    <div className="w-8 h-8">
                        <Image src="/bnb.svg" alt="bnb" width={40} height={40} />
                    </div>
                </div>

                <div ref={referralContainerRef} className="mt-4 space-y-1 rounded-lg">
                    {affiliate.referralCode && !affiliate.isValidReferralCode && (
                        <p className="text-black text-sm mt-1">Referral code must be 6 letters</p>
                    )}

                    <div className="relative flex justify-between items-center rounded-lg">
                        <input
                            type="text"
                            placeholder="Enter Referral Code"
                            onFocus={() => handleInputFocus(referralContainerRef)}
                            value={affiliate.referralCode}
                            onChange={(e) => handleReferralCodeChange(e.target.value)}
                            spellCheck={false}          
                            autoCorrect="off"           
                            autoCapitalize="characters" 
                            className={`w-full pl-4 py-4 text-3xl placeholder:text-xl placeholder:font-normal font-bold border-1 border-[#fd3ff4] focus:outline-none no-scrollbar rounded-lg
                                focus:ring-1 ${affiliate.referralCode && !affiliate.isValidReferralCode ?
                                    'border-red-500 focus:ring-red-500 text-red-500' :
                                    'border-[#fd3ff4]/80 focus:ring-[#fd3ff4] text-[#fd3ff4]'
                                } placeholder:text-gray-600`}
                            maxLength={6}
                        />
                        <Image
                            className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            src="/refercode.svg"
                            alt='code'
                            width={40}
                            height={40}
                        />
                    </div>
                </div>

                <div ref={usdtContainerRef} className="mt-4 space-y-1 p-2 lg:p-4 rounded-lg bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium">Sell</h2>
                        <div className="flex items-center px-2 space-x-1 rounded-full bg-[#fd3ff4]/10 py-1">
                            <div className="w-5 h-5">
                                <Image src="/usdt.svg" alt="usdt" width={50} height={50} />
                            </div>
                            <h2 className="text-xl font-medium">USDT</h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center rounded-lg">
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            onFocus={() => handleInputFocus(usdtContainerRef)}
                            value={affiliate.usdtAmount}
                            onChange={(e) => handleUSDTChange(e.target.value)}
                            className={`w-full bg-transparent text-2xl placeholder:text-gray-400 focus:outline-none no-scrollbar font-bold placeholder:font-normal
                                ${!isAmountValid ? 'text-red-600' : 'text-[#fd3ff4]'}`}
                            min={affiliate.minPurchase}
                        />
                        <div className="flex items-center space-x-1">
                            <span className="text-gray-800 opacity-60">
                                {userAddress ?
                                    (affiliate.usdtBalance !== undefined ?
                                        affiliate.usdtBalance.toFixed(2) :
                                        <PinkSpinner />) :
                                    '0.00'}
                            </span>
                            <div className="w-6 h-6 opacity-30">
                                <Image src="/wallet.svg" alt="wallet" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                    {!isAmountValid && (
                        <p className="text-red-600 font-normal text-lg mt-1">
                            {parseFloat(affiliate.usdtAmount) < affiliate.minPurchase ?
                                `min. investment is ${affiliate.minPurchase} USDT` :
                                "Insufficient USDT balance"}
                        </p>
                    )}
                </div>

                <div ref={ramiContainerRef} className="mt-4 space-y-1 p-2 rounded-lg bg-[#ffffff]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-medium">Buy</h2>
                        <div className="flex items-center space-x-1 px-2 rounded-full bg-[#fd3ff4]/10 py-1">
                            <div className="w-6 h-6">
                                <Image src="/heart.svg" alt="rami" width={50} height={50} />
                            </div>
                            <h2 className="text-xl font-medium">RAMI</h2>
                        </div>
                    </div>

                    <div className="flex justify-between items-center rounded-lg">
                        <input
                            type="number"
                            placeholder="Enter Amount"
                            onFocus={() => handleInputFocus(ramiContainerRef)}
                            value={affiliate.ramiAmount}
                            onChange={(e) => handleRAMIChange(e.target.value)}
                            className={`w-full bg-transparent text-2xl placeholder:text-gray-400 focus:outline-none no-scrollbar font-bold placeholder:font-normal
                                ${!isRamiAmountValid ? 'text-red-600' : 'text-[#fd3ff4]'}`}
                            min={affiliate.minRamiPurchase}
                        />
                        <div className="flex items-center space-x-1">
                            <span className="text-gray-800 opacity-60">
                                {userAddress ?
                                    (affiliate.ramiBalance !== undefined ?
                                        affiliate.ramiBalance.toFixed(2) :
                                        <PinkSpinner />) :
                                    '0.00'}
                            </span>
                            <div className="w-6 h-6 opacity-30">
                                <Image src="/wallet.svg" alt="wallet" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                    {!isRamiAmountValid && (
                        <p className="text-red-600 font-normal text-lg mt-1">
                            {parseFloat(affiliate.ramiAmount) < 10000 ?
                                `min. investment is 10,000 RAMI` :
                                "Insufficient RAMI balance"}
                        </p>
                    )}
                </div>

                <div className='flex justify-center items-center space-x-1'>
                    <button
                        onClick={handleApproveUSDT}
                        disabled={
                            !needsApproval ||
                            !isAmountValid ||
                            isLoading ||
                            (affiliate.referralCode !== "" && !affiliate.isValidReferralCode)
                        }
                        className={`flex justify-center items-center w-1/2 py-4 text-white font-extrabold
                            cursor-pointer text-xl transition-all rounded-lg border-white border-b-[4px]
                            ${needsApproval ? 'bg-red-500 hover:brightness-110' : 'bg-[#fd3ff4]'}
                            disabled:opacity-75 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <RedSpinner />
                                Approving...
                            </div>
                        ) : 'Approve USDT'}
                    </button>

                    <button
                        onClick={handlePurchase}
                        disabled={
                            needsApproval ||
                            !isAmountValid ||
                            isLoading ||
                            (affiliate.referralCode !== "" && !affiliate.isValidReferralCode)
                        }
                        className="flex justify-center items-center w-1/2 py-4 bg-[#fd3ff4] text-white font-extrabold
                            cursor-pointer text-xl transition-all rounded-lg border-white border-b-[4px]
                            hover:brightness-110 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <WhiteSpinner />
                                Processing...
                            </div>
                        ) : '$ Invest Now'}
                    </button>
                </div>
            </div>
        </div>
    )
}