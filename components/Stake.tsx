'use client'

import { useGlobal } from '@/context/global'
import Image from 'next/image'
import PinkSpinner from '@/components/Spinners/PinkSpin'
import BlueSpinner from '@/components/Spinners/BlueSpin'
import EmeraldSpinner from './Spinners/EmeraldSpin'
import RedSpinner from './Spinners/RedSpin'
import GreenSpinner from './Spinners/GreenSpin'

export default function StakingPage() {
    const {
        staking,
        presale,
        handleStakeRamiChange,
        handleUnstakeChange,
        handleStakeApprove,
        handleStake,
        handleUnstake,
        handleClaim,
        refetchAllData,
    } = useGlobal()

    const getButtonState = () => {
        if (!staking.ramiStakeAmount) return { text: "Enter Amount", disabled: true }
        if (staking.isStakeInsufficient) return { text: "Insufficient Balance", disabled: true }
        if (staking.isApprovingStake) return { text: `Approving... (${staking.approveStakeTimer}s)`, disabled: true }
        if (staking.isStaking) return { text: `Staking... (${staking.stakeTimer}s)`, disabled: true }
        return { text: staking.isStakeApproved ? "Stake" : "Approve", disabled: false }
    }

    const { text: buttonText, disabled } = getButtonState()

    return (
        <div className="relative w-screen min-h-screen flex flex-col items-center p-2 bg-gradient-to-b from-pink-50 to-white">
            <div className="w-full max-w-7xl grid bento-grid gap-6 p-2 mt-[15dvh] lg:mt-[20dvh]">
                {/* Stake Card */}
                <div className="col-span-4 lg:col-span-8 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-[#fd3ff4]">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl text-[#fd3ff4]/70 font-light">Welcome to</h3>
                                <h1 className="text-4xl pb-2 lg:text-5xl font-bold text-[#fd3ff4]">
                                    Ramicoin Staking
                                </h1>
                            </div>
                            <p className="hidden lg:block lg:text-2xl lg:text-gray-600 lg:leading-normal">
                                Users can buy Ramicoin & stake it to start earning passive income in USDT,
                                paid daily according to the profits generated from trading BTC & gold.
                            </p>
                            <div className="hidden lg:flex justify-center items-center space-x-4 opacity-75">
                                <hr className="w-1/3 border-t-2 border-[#fd3ff4]/70" />
                                <Image src="/heart.svg" alt="divider" width={24} height={24} />
                                <hr className="w-1/3 border-t-2 border-[#fd3ff4]/70" />
                            </div>
                        </div>
                        <div className="bg-[#fd3ff4]/10 rounded-2xl p-2 space-y-6 shadow-inner">
                            <div className="flex justify-between items-center bg-white rounded-lg py-4 px-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-[#fd3ff4]/80">Allowance:</span>
                                    <span className="font-normal text-[#fd3ff4]">
                                        {staking.allowance.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-normal text-[#fd3ff4]">
                                        {presale.ramiLoading ? <PinkSpinner /> : `${presale.ramiBalance.toFixed(2)} RAMI`}
                                    </span>
                                    <Image src="/pwallet.svg" alt="wallet" width={24} height={24} className="opacity-40" />
                                </div>
                            </div>
                            <Image src="/stake.svg" alt="logo" width={80} height={80} className="mx-auto" />
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold text-[#fd3ff4]/90">My Staked Coins</h2>
                                <h1 className="flex justify-center items-center text-3xl font-bold text-[#fd3ff4]">
                                    {staking.stakedBalance ? staking.stakedBalance.toFixed(2) : <PinkSpinner />}
                                </h1>
                            </div>
                            <input
                                type="number"
                                placeholder="Enter Ramicoin Amount"
                                value={staking.ramiStakeAmount}
                                onChange={(e) => handleStakeRamiChange(e.target.value)}
                                className={`w-full text-center p-4 text-[#fd3ff4]/80 font-bold placeholder:font-medium text-2xl placeholder:text-xl rounded-xl border-2 ${staking.isStakeInsufficient ? "border-red-600 text-red-600" : "border-[#fd3ff4]/60"
                                    } focus:outline-none`}
                            />
                            <div className="flex gap-1">
                                <button
                                    onClick={staking.isStakeApproved ? handleStake : handleStakeApprove}
                                    disabled={disabled}
                                    className={`flex-1 py-4 text-white text-xl rounded-xl font-bold transition-all ${disabled ? "bg-[#fd3ff4]/50" : "bg-[#fd3ff4]/90 hover:text-[#fd3ff4]"
                                        } shadow-lg hover:shadow-pink-200`}
                                >
                                    {buttonText}
                                </button>
                                <button
                                    onClick={refetchAllData}
                                    className="w-16 bg-white border-2 border-pink-200 rounded-xl flex items-center justify-center hover:bg-pink-50"
                                >
                                    <Image src="/refresh.svg" alt="refresh" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Unstake Card */}
                <div className="col-span-4 lg:col-span-8 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-blue-400">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="text-center space-y-6 mt-[4dvh]">
                            <h1 className="text-3xl lg:text-5xl font-bold text-blue-600 pb-2">
                                Unstaking Ramicoin
                            </h1>
                            <p className="hidden lg:block lg:text-2xl lg:text-gray-600 lg:leading-normal">
                                To unstake Ramicoin, users must wait for the 48-hour lock period to end,
                                starting from their last staking entry. Once the lock period expires,
                                they can initiate the unstaking process through the platform's interface.
                            </p>
                            <div className="hidden lg:flex justify-center items-center space-x-4 opacity-75">
                                <hr className="w-1/3 border-t-2 border-blue-200" />
                                <Image src="/heart.svg" alt="divider" width={24} height={24} />
                                <hr className="w-1/3 border-t-2 border-blue-200" />
                            </div>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-2 space-y-6 shadow-inner">
                            <div className="flex justify-between items-center bg-white rounded-lg py-4 px-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-blue-600">Staked:</span>
                                    <span className="font-medium">
                                        {staking.stakedBalance ? staking.stakedBalance.toFixed(2) : <BlueSpinner />}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">
                                        {presale.ramiLoading ? <BlueSpinner /> : `${presale.ramiBalance.toFixed(2)} RAMI`}
                                    </span>
                                    <Image src="/wallet.svg" alt="wallet" width={24} height={24} className="opacity-40" />
                                </div>
                            </div>
                            <Image src="/lock.svg" alt="lock" width={70} height={70} className="mx-auto" />
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold text-blue-500">Unlock Time</h2>
                                <h1 className="text-4xl font-bold text-blue-700">{staking.remainingTime}</h1>
                            </div>
                            <input
                                type="number"
                                placeholder="Enter amount to unstake"
                                value={staking.unstakeAmount}
                                onChange={(e) => handleUnstakeChange(e.target.value)}
                                className="w-full text-center p-4 rounded-xl border-2 border-blue-200 text-blue-500 font-bold placeholder:font-medium text-2xl placeholder:text-xl focus:outline-none"
                            />
                            <div className="flex gap-1">
                                {parseFloat(staking.remainingTime) > 0 ? (
                                    <button className="flex-1 py-4 bg-blue-400 text-white rounded-xl font-bold  text-xl shadow-lg">
                                        Locked
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleUnstake}
                                        className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-blue-200"
                                    >
                                        Unstake
                                    </button>
                                )}
                                <button
                                    onClick={refetchAllData}
                                    className="w-16 flex justify-center items-center bg-white border-2 border-blue-200 rounded-xl hover:bg-blue-50"
                                >
                                    <Image src="/clock.svg" alt="time" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Claim Card */}
                <div className="col-span-4 lg:col-span-4 bento-card bg-white p-2 rounded-3xl shadow-xl border-b-4 border-green-400">
                    <div className="h-full flex flex-col justify-between space-y-6">
                        <div className="text-center space-y-6 mt-[2dvh]">
                            <h1 className="text-4xl font-bold text-green-600">Claim Rewards</h1>
                            <p className="hidden lg:block lg:text-2xl lg:text-gray-600 lg:leading-normal">
                                Users can claim their reward only if they have staked their Ramicoin in the smart pool.
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-2xl p-2 space-y-6 shadow-inner">
                            <div className="flex justify-between items-center bg-white rounded-lg py-4 px-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-green-600">Staked:</span>
                                    <span className="font-medium">
                                        {staking.stakedBalance ? `${staking.stakedBalance.toFixed(2)}` : <GreenSpinner />}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">
                                        {presale.usdtLoading ? <GreenSpinner /> : `${presale.usdtBalance.toFixed(2)} USDT`}
                                    </span>
                                    <Image src="/wallet.svg" alt="wallet" width={24} height={24} className="opacity-50" />
                                </div>
                            </div>
                            <Image src="/claim.svg" alt="claim" width={80} height={80} className="mx-auto" />
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-semibold text-green-500">Available Rewards</h2>
                                <h1 className="text-4xl font-bold text-green-700 flex justify-center items-center">{staking.rewards ? `${staking.rewards.toFixed(4)}` : <GreenSpinner />}</h1>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={handleClaim}
                                    className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-green-200"
                                >
                                    Claim
                                </button>
                                <button
                                    onClick={() => refetchAllData()}
                                    className="w-16 flex justify-center items-center bg-white border-2 border-green-200 rounded-xl hover:bg-green-50"
                                >
                                    <Image src="/grefresh.svg" alt="refresh" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pool Cards */}
                <div className="col-span-4 lg:col-span-4 grid gap-6">
                    {/* Burn Pool */}
                    <div className="bento-card bg-white p-4 rounded-3xl shadow-xl border-b-4 border-red-400">
                        <div className="h-full flex flex-col justify-center items-center space-y-6">
                            <Image src="/burn.svg" alt="burn" width={80} height={80} />
                            <h2 className="text-2xl opacity-80 font-bold text-[#ff0313]/80">Burn Pool</h2>
                            <div className="text-4xl font-bold text-[#ff0313]/90">
                                {staking.burnPool ? `${staking.burnPool.toFixed(4)}` : <RedSpinner />}
                            </div>
                        </div>
                    </div>

                    {/* Reserve Pool */}
                    <div className="bento-card bg-white p-8 rounded-3xl shadow-xl border-b-4 border-emerald-400">
                        <div className="h-full flex flex-col justify-center items-center space-y-6">
                            <Image src="/reserve.svg" alt="reserve" width={80} height={80} />
                            <h2 className="text-2xl font-bold text-[#059669]/80">Reserve Pool</h2>
                            <div className="text-4xl font-bold text-[#059669]/90">
                                {staking.reservePool ? `${staking.reservePool.toFixed(4)}` : <EmeraldSpinner />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
