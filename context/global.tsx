'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { toast } from 'react-toastify'
import USDTABI from '@/ABI/UsdtABI.json'
import RAMIABI from '@/ABI/RamiABI.json'
import StakingABI from '@/ABI/StakingABI.json'
import PRESALEABI from '@/ABI/PresaleABI.json'

type GlobalContextType = {
    // Presale State
    presale: {
        usdtAmount: string
        ramiAmount: string
        isInsufficient: boolean
        isApproved: boolean
        isApproving: boolean
        isSwapping: boolean
        approveTimer: number
        swapTimer: number
        usdtBalance: number
        ramiBalance: number
        usdtLoading: boolean
        ramiLoading: boolean
    }

    // Staking State
    staking: {
        unstakeAmount: string
        ramiStakeAmount: string
        stakedData: any[] | null
        remainingTime: string
        isStakeInsufficient: boolean
        isStakeApproved: boolean
        isApprovingStake: boolean
        isStaking: boolean
        approveStakeTimer: number
        stakeTimer: number
        stakedBalance: number
        rewards: number
        burnPool: number
        reservePool: number
        allowance: number
    }

    // Methods
    handlePresaleUSDTChange: (value: string) => void
    handlePresaleRAMIChange: (value: string) => void
    handlePresaleApprove: () => Promise<void>
    handleSwap: () => Promise<void>
    handleStakeRamiChange: (value: string) => void
    handleUnstakeChange: (value: string) => void
    handleStakeApprove: () => Promise<void>
    handleStake: () => Promise<void>
    handleUnstake: () => Promise<void>
    handleClaim: () => Promise<void>
    refetchAllData: () => void
}

const GlobalContext = createContext<GlobalContextType | null>(null)

const contractAddresses = {
    USDT: '0x55d398326f99059ff775485246999027b3197955' as `0x${string}`,
    RAMI: '0xB93235b024a3063e3cf56cAB9991f99C513bEe78' as `0x${string}`,
    PRESALE: '0x29ed8a7e71a3dcb7a7b322bb8e07e1d87ff54498' as `0x${string}`,
    STAKING: '0xDa093AA6C40DEB04c6B15DA3A82D304Af58e8F8F' as `0x${string}`,
}

const EXCHANGE_RATE = 0.005

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const { address: userAddress } = useAccount()
    const { writeContract } = useWriteContract()

    // Shared token balances
    const {
        balance: usdtBalance,
        loading: usdtLoading,
        refetch: refetchUSDT
    } = useTokenBalance(USDTABI, contractAddresses.USDT)

    const {
        balance: ramiBalance,
        loading: ramiLoading,
        refetch: refetchRAMI
    } = useTokenBalance(RAMIABI, contractAddresses.RAMI)

    // Presale state
    const [presale, setPresale] = useState({
        usdtAmount: '',
        ramiAmount: '',
        isInsufficient: false,
        isApproved: false,
        isApproving: false,
        isSwapping: false,
        approveTimer: 15,
        swapTimer: 15
    })

    // Staking state
    const [staking, setStaking] = useState({
        unstakeAmount: '',
        ramiStakeAmount: '',
        stakedData: null as any[] | null,
        remainingTime: '00:00:00',
        isStakeInsufficient: false,
        isStakeApproved: false,
        isApprovingStake: false,
        isStaking: false,
        approveStakeTimer: 15,
        stakeTimer: 15,
        stakedBalance: 0,
        rewards: 0,
        burnPool: 0,
        reservePool: 0,
        allowance: 0
    })

    // Staking contract data
    const { data: stakedData, refetch: refetchStaked } = useReadContract({
        address: contractAddresses.STAKING,
        abi: StakingABI,
        functionName: 'ramicoinStakers',
        args: [userAddress]
    })

    const { data: rewardsData, refetch: refetchRewards } = useReadContract({
        address: contractAddresses.STAKING,
        abi: StakingABI,
        functionName: 'getPendingRewards',
        args: [userAddress]
    })

    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
        address: contractAddresses.RAMI,
        abi: RAMIABI,
        functionName: 'allowance',
        args: [userAddress, contractAddresses.STAKING]
    })

    const { data: burnPoolData, refetch: refetchBurnPool } = useReadContract({
        address: contractAddresses.STAKING,
        abi: StakingABI,
        functionName: 'burnPool'
    })

    const { data: reservePoolData, refetch: refetchReservePool } = useReadContract({
        address: contractAddresses.STAKING,
        abi: StakingABI,
        functionName: 'reservePool'
    })

    // Derived staking values
    useEffect(() => {
        setStaking(s => ({
            ...s,
            stakedData: stakedData as any[] | null,
            stakedBalance: stakedData && Array.isArray(stakedData) ? Number(stakedData[0]) / 1e18 : 0,
            rewards: rewardsData ? Number(rewardsData) / 1e18 : 0,
            allowance: allowanceData ? Number(allowanceData) / 1e18 : 0,
            burnPool: burnPoolData ? Number(burnPoolData) / 1e18 : 0,
            reservePool: reservePoolData ? Number(reservePoolData) / 1e18 : 0
        }))
    }, [stakedData, rewardsData, allowanceData, burnPoolData, reservePoolData])

    // timestamp
    useEffect(() => {
        const calculateRemainingTime = () => {
            if (!stakedData || !Array.isArray(stakedData) || stakedData.length < 2) {
                setStaking(s => ({ ...s, remainingTime: "00:00:00" }))
                return
            }

            const stakeTimestamp = Number(stakedData[1])
            const unlockTime = stakeTimestamp + 48 * 60 * 60
            const currentTime = Math.floor(Date.now() / 1000)
            const remainingSeconds = unlockTime - currentTime

            if (remainingSeconds <= 0) {
                setStaking(s => ({ ...s, remainingTime: "Unlocked" }))
                return
            }

            const hours = Math.floor(remainingSeconds / 3600)
            const minutes = Math.floor((remainingSeconds % 3600) / 60)
            const seconds = remainingSeconds % 60

            setStaking(s => ({
                ...s,
                remainingTime: `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            }))
        }

        // Initial calculation
        calculateRemainingTime()

        // Update every second if not unlocked
        const intervalId = setInterval(() => {
            if (staking.remainingTime !== "Unlocked") {
                calculateRemainingTime()
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [stakedData, staking.remainingTime])

    // Presale effects
    useEffect(() => {
        const usdtValue = parseFloat(presale.usdtAmount) || 0
        setPresale(p => ({ ...p, isInsufficient: usdtValue > (usdtBalance || 0) }))
    }, [presale.usdtAmount, usdtBalance])

    useEffect(() => {
        if (presale.isApproving && presale.approveTimer > 0) {
            const interval = setInterval(() => {
                setPresale(p => ({ ...p, approveTimer: p.approveTimer - 1 }))
            }, 1000)
            return () => clearInterval(interval)
        } else if (presale.isApproving && presale.approveTimer === 0) {
            setPresale(p => ({ ...p, isApproving: false, isApproved: true, approveTimer: 15 }))
            toast.success('USDT Approval successful!')
        }
    }, [presale.isApproving, presale.approveTimer])

    useEffect(() => {
        if (presale.isSwapping && presale.swapTimer > 0) {
            const interval = setInterval(() => {
                setPresale(p => ({ ...p, swapTimer: p.swapTimer - 1 }))
            }, 1000)
            return () => clearInterval(interval)
        } else if (presale.isSwapping && presale.swapTimer === 0) {
            setPresale(p => ({ ...p, isSwapping: false, swapTimer: 15 }))
            refetchUSDT()
            refetchRAMI()
            toast.success('Swap successful!')
        }
    }, [presale.isSwapping, presale.swapTimer])

    // Staking effects
    useEffect(() => {
        if (staking.isApprovingStake && staking.approveStakeTimer > 0) {
            const interval = setInterval(() => {
                setStaking(s => ({ ...s, approveStakeTimer: s.approveStakeTimer - 1 }))
            }, 1000)
            return () => clearInterval(interval)
        } else if (staking.isApprovingStake && staking.approveStakeTimer === 0) {
            setStaking(s => ({ ...s, isApprovingStake: false, isStakeApproved: true, approveStakeTimer: 15 }))
            refetchAllowance()
            toast.success('RAMI Approval successful!')
        }
    }, [staking.isApprovingStake, staking.approveStakeTimer])

    useEffect(() => {
        if (staking.isStaking && staking.stakeTimer > 0) {
            const interval = setInterval(() => {
                setStaking(s => ({ ...s, stakeTimer: s.stakeTimer - 1 }))
            }, 1000)
            return () => clearInterval(interval)
        } else if (staking.isStaking && staking.stakeTimer === 0) {
            setStaking(s => ({ ...s, isStaking: false, stakeTimer: 15 }))
            refetchRAMI()
            refetchStaked()
            toast.success('Staking successful!')
        }
    }, [staking.isStaking, staking.stakeTimer])

    // Handlers
    const handleTransaction = async (
        config: Parameters<typeof writeContract>[0],
        successMessage: string,
        errorMessage: string,
        stateUpdaters: {
            start?: () => void
            success?: () => void
            error?: () => void
        }
    ) => {
        try {
            stateUpdaters.start?.()
            await writeContract(config)
            stateUpdaters.success?.()
            toast.success(successMessage)
        } catch (error) {
            stateUpdaters.error?.()
            toast.error(errorMessage)
            console.error(error)
        }
    }

    // Presale handlers
    const handlePresaleUSDTChange = useCallback((value: string) => {
        setPresale(p => ({
            ...p,
            usdtAmount: value,
            ramiAmount: value ? (parseFloat(value) / EXCHANGE_RATE).toFixed(3) : ''
        }))
    }, [])

    const handlePresaleRAMIChange = useCallback((value: string) => {
        setPresale(p => ({
            ...p,
            ramiAmount: value,
            usdtAmount: value ? (parseFloat(value) * EXCHANGE_RATE).toFixed(3) : ''
        }))
    }, [])

    const handlePresaleApprove = useCallback(async () => {
        const amount = parseFloat(presale.usdtAmount)
        if (!userAddress || isNaN(amount)) {
            toast.error('Invalid USDT amount')
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.USDT,
                abi: USDTABI,
                functionName: 'approve',
                args: [contractAddresses.PRESALE, BigInt(amount * 1e18)]
            },
            'USDT Approval successful!',
            'USDT Approval failed',
            {
                start: () => setPresale(p => ({ ...p, isApproving: true })),
                success: () => setPresale(p => ({ ...p, isApproved: true })),
                error: () => setPresale(p => ({ ...p, isApproving: false }))
            }
        )
    }, [presale.usdtAmount, userAddress])

    const handleSwap = useCallback(async () => {
        const amount = parseFloat(presale.usdtAmount)
        if (!userAddress || isNaN(amount)) {
            toast.error('Invalid USDT amount')
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.PRESALE,
                abi: PRESALEABI,
                functionName: 'buyWithUSDT',
                args: [BigInt(amount * 1e18)]
            },
            'Swap successful!',
            'Swap failed',
            {
                start: () => setPresale(p => ({ ...p, isSwapping: true })),
                success: () => setPresale(p => ({ ...p, usdtAmount: '', ramiAmount: '' })),
                error: () => setPresale(p => ({ ...p, isSwapping: false }))
            }
        )
    }, [presale.usdtAmount, userAddress])

    // Staking handlers
    const handleStakeRamiChange = useCallback((value: string) => {
        setStaking(s => ({
            ...s,
            ramiStakeAmount: value,
            isStakeInsufficient: parseFloat(value) > (ramiBalance || 0)
        }))
    }, [ramiBalance])

    const handleUnstakeChange = useCallback((value: string) => {
        setStaking(s => ({ ...s, unstakeAmount: value }))
    }, [])

    const handleStakeApprove = useCallback(async () => {
        const amount = parseFloat(staking.ramiStakeAmount)
        if (!userAddress || isNaN(amount)) {
            toast.error('Invalid RAMI amount')
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.RAMI,
                abi: RAMIABI,
                functionName: 'approve',
                args: [contractAddresses.STAKING, BigInt(amount * 1e18)]
            },
            'RAMI Approval successful!',
            'RAMI Approval failed',
            {
                start: () => setStaking(s => ({ ...s, isApprovingStake: true })),
                success: () => setStaking(s => ({ ...s, isStakeApproved: true })),
                error: () => setStaking(s => ({ ...s, isApprovingStake: false }))
            }
        )
    }, [staking.ramiStakeAmount, userAddress])

    const handleStake = useCallback(async () => {
        const amount = parseFloat(staking.ramiStakeAmount)
        if (!userAddress || isNaN(amount)) {
            toast.error('Invalid RAMI amount')
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.STAKING,
                abi: StakingABI,
                functionName: 'stake',
                args: [BigInt(amount * 1e18)]
            },
            'Staking successful!',
            'Staking failed',
            {
                start: () => setStaking(s => ({ ...s, isStaking: true })),
                success: () => setStaking(s => ({ ...s, ramiStakeAmount: '' })),
                error: () => setStaking(s => ({ ...s, isStaking: false }))
            }
        )
    }, [staking.ramiStakeAmount, userAddress])

    const handleUnstake = useCallback(async () => {
        const amount = parseFloat(staking.unstakeAmount)
        if (!userAddress || isNaN(amount)) {
            toast.error('Invalid unstake amount')
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.STAKING,
                abi: StakingABI,
                functionName: 'unstake',
                args: [BigInt(amount * 1e18)]
            },
            'Unstake successful!',
            'Unstake failed',
            {
                success: () => setStaking(s => ({ ...s, unstakeAmount: '' }))
            }
        )
    }, [staking.unstakeAmount, userAddress])

    const handleClaim = useCallback(async () => {
        if (!userAddress || staking.rewards <= 0) {
            toast.error("No rewards to claim")
            return
        }

        await handleTransaction(
            {
                address: contractAddresses.STAKING,
                abi: StakingABI,
                functionName: "claim",
            },
            "Claim successful!",
            "Claim failed",
            {
                success: () => refetchRewards()
            }
        )
    }, [staking.rewards, userAddress])

    const refetchAllData = useCallback(() => {
        refetchUSDT()
        refetchRAMI()
        refetchStaked()
        refetchRewards()
        refetchAllowance()
        refetchBurnPool()
        refetchReservePool()
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                presale: {
                    ...presale,
                    usdtBalance: usdtBalance || 0,
                    ramiBalance: ramiBalance || 0,
                    usdtLoading,
                    ramiLoading
                },
                staking,
                handlePresaleUSDTChange,
                handlePresaleRAMIChange,
                handlePresaleApprove,
                handleSwap,
                handleStakeRamiChange,
                handleUnstakeChange,
                handleStakeApprove,
                handleStake,
                handleUnstake,
                handleClaim,
                refetchAllData
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

function useTokenBalance(abi: any, address: `0x${string}`) {
    const { address: userAddress } = useAccount()
    const { data, isLoading, error, refetch } = useReadContract({
        abi,
        address,
        functionName: 'balanceOf',
        args: userAddress ? [userAddress] : undefined,
    })

    return {
        balance: data ? Number(data) / 1e18 : 0,
        loading: isLoading,
        error,
        refetch,
    }
}

export const useGlobal = () => {
    const context = useContext(GlobalContext)
    if (!context) throw new Error('useGlobal must be used within GlobalProvider')
    return context
}
