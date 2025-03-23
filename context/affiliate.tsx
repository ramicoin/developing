'use client'

import { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import {
    useAccount,
    useReadContracts,
    useWriteContract,
} from 'wagmi'
import { toast } from 'react-toastify'
import AFFILIATEABI from '@/ABI/AffiliateABI.json'
import USDTABI from '@/ABI/UsdtABI.json'
import RAMIABI from '@/ABI/RamiABI.json'
import { parseUnits, type Address, type Abi } from 'viem'

type AffiliateState = {
    usdtAmount: string
    ramiAmount: string
    referralCode: string
    generatedCode: string
    referrer: string
    referralCount: number
    salesVolume: number
    totalEarnings: number
    usdtBalance: number | undefined
    ramiBalance: number | undefined
    commissionRate: number
    minPurchase: number
    minRamiPurchase: number
    ramiPrice: number
    totalSales: number
    totalUsers: number
    exists: boolean
    isValidReferralCode: boolean
    allowance: number
    referralLink: string
}

type AffiliateContextType = {
    state: AffiliateState
    isAmountValid: boolean
    isRamiAmountValid: boolean
    isLoading: boolean
    handleUSDTChange: (value: string) => void
    handleRAMIChange: (value: string) => void
    handleReferralCodeChange: (value: string) => void
    handleGenerateCode: () => Promise<void>
    handlePurchase: () => Promise<void>
    handleApproveUSDT: () => Promise<void>
}

const MIN_RAMI_PURCHASE = 10000
const USDT_EXCHANGE_RATE = 0.005
const CONTRACT_ADDRESSES = {
    AFFILIATE: '0xa178314e66c3dfe960e1de35e6288d718ad45a30' as Address,
    USDT: '0x55d398326f99059ff775485246999027b3197955' as Address,
    RAMI: '0xB93235b024a3063e3cf56cAB9991f99C513bEe78' as Address,
}

function affiliateReducer(state: AffiliateState, action: any): AffiliateState {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value }
        case 'BATCH_UPDATE':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const initialState: AffiliateState = {
    usdtAmount: '',
    ramiAmount: '',
    referralCode: '',
    generatedCode: '',
    referrer: '',
    referralCount: 0,
    salesVolume: 0,
    totalEarnings: 0,
    usdtBalance: undefined,
    ramiBalance: undefined,
    commissionRate: 0,
    minPurchase: MIN_RAMI_PURCHASE / 200,
    minRamiPurchase: MIN_RAMI_PURCHASE,
    ramiPrice: USDT_EXCHANGE_RATE,
    totalSales: 0,
    totalUsers: 0,
    exists: false,
    isValidReferralCode: false,
    allowance: 0,
    referralLink: '',
}

const AffiliateContext = createContext<AffiliateContextType | null>(null)

export function AffiliateProvider({ children }: { children: React.ReactNode }) {
    const { address: userAddress } = useAccount()
    const [state, dispatch] = useReducer(affiliateReducer, initialState)
    const { writeContractAsync } = useWriteContract()

    const contracts = useMemo(() => [
        {
            address: CONTRACT_ADDRESSES.AFFILIATE,
            abi: AFFILIATEABI as Abi,
            functionName: 'totalSalesVolume' as const
        },
        {
            address: CONTRACT_ADDRESSES.AFFILIATE,
            abi: AFFILIATEABI as Abi,
            functionName: 'userCount' as const
        },
        {
            address: CONTRACT_ADDRESSES.AFFILIATE,
            abi: AFFILIATEABI as Abi,
            functionName: 'users' as const,
            args: [userAddress as Address]
        },
        {
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDTABI as Abi,
            functionName: 'balanceOf' as const,
            args: [userAddress as Address]
        },
        {
            address: CONTRACT_ADDRESSES.RAMI,
            abi: RAMIABI as Abi,
            functionName: 'balanceOf' as const,
            args: [userAddress as Address]
        },
        {
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDTABI as Abi,
            functionName: 'allowance' as const,
            args: [userAddress as Address, CONTRACT_ADDRESSES.AFFILIATE]
        }
    ], [userAddress])

    const { data: contractData, refetch } = useReadContracts({
        contracts,
        query: { enabled: !!userAddress }
    })

    const isLoading = useMemo(
        () => (contractData ?? []).some(c => {
            const status = (c as { status: 'pending' | 'success' | 'error' }).status
            return status === 'pending'
        }),
        [contractData]
    )

    useMemo(() => {
        if (!contractData) return

        const [
            totalSalesVolume,
            totalUserCount,
            userData,
            usdtBalance,
            ramiBalance,
            allowance
        ] = contractData

        const batchUpdate: Partial<AffiliateState> = {
            totalSales: Number(totalSalesVolume?.result || 0) / 1e18,
            totalUsers: Number(totalUserCount?.result || 0),
            usdtBalance: usdtBalance?.result !== undefined ? Number(usdtBalance.result) / 1e18 : undefined,
            ramiBalance: ramiBalance?.result !== undefined ? Number(ramiBalance.result) / 1e18 : undefined,
            allowance: Number(allowance?.result || 0) / 1e18,
        }

        if (userData?.result) {
            const [
                referralCode,
                referrer,
                referralCount,
                salesVolume,
                totalRamicoinEarned,
                exists
            ] = userData.result as [string, string, bigint, bigint, bigint, boolean]

            Object.assign(batchUpdate, {
                generatedCode: referralCode || '',
                referrer: referrer || '',
                referralCount: Number(referralCount),
                salesVolume: Number(salesVolume) / 1e18,
                totalEarnings: Number(totalRamicoinEarned) / 1e18,
                exists,
                referralLink: referralCode ? `${window.location.origin}/swap?referral=${referralCode}` : ''
            })
        }

        dispatch({ type: 'BATCH_UPDATE', payload: batchUpdate })
    }, [contractData])

    const [isAmountValid, isRamiAmountValid] = useMemo(() => [
        state.usdtBalance !== undefined &&
        parseFloat(state.usdtAmount) >= state.minPurchase &&
        parseFloat(state.usdtAmount) <= state.usdtBalance,

        state.ramiBalance !== undefined &&
        parseFloat(state.ramiAmount) >= state.minRamiPurchase &&
        parseFloat(state.ramiAmount) <= state.ramiBalance
    ], [state.usdtAmount, state.ramiAmount, state.usdtBalance, state.ramiBalance])

    const handleTransaction = useCallback(async (txConfig: any) => {
        try {
            const hash = await writeContractAsync(txConfig)
            toast.info('Transaction submitted')
            return hash
        } catch (error) {
            toast.error('Transaction failed')
            console.error(error)
            return null
        }
    }, [writeContractAsync])

    const handleGenerateCode = useCallback(async () => {
        await handleTransaction({
            address: CONTRACT_ADDRESSES.AFFILIATE,
            abi: AFFILIATEABI as Abi,
            functionName: 'generateReferralCode',
        })
        refetch()
    }, [handleTransaction, refetch])

    const handleApproveUSDT = useCallback(async () => {
        const usdtValue = parseUnits(state.usdtAmount, 18)
        const hash = await handleTransaction({
            address: CONTRACT_ADDRESSES.USDT,
            abi: USDTABI as Abi,
            functionName: 'approve',
            args: [CONTRACT_ADDRESSES.AFFILIATE, usdtValue]
        })

        if (hash) refetch()
    }, [state.usdtAmount, handleTransaction, refetch])

    const handlePurchase = useCallback(async () => {
        if (!userAddress || !state.usdtAmount) return

        const usdtValue = parseUnits(state.usdtAmount, 18)
        const hash = await handleTransaction({
            address: CONTRACT_ADDRESSES.AFFILIATE,
            abi: AFFILIATEABI as Abi,
            functionName: 'purchase',
            args: [usdtValue, state.referralCode || '']
        })

        if (hash) {
            dispatch({ type: 'SET_FIELD', field: 'usdtAmount', value: '' })
            dispatch({ type: 'SET_FIELD', field: 'referralCode', value: '' })
            refetch()
        }
    }, [userAddress, state.usdtAmount, state.referralCode, handleTransaction, refetch])

    const handleUSDTChange = useCallback((value: string) => {
        dispatch({ type: 'SET_FIELD', field: 'usdtAmount', value })
        dispatch({
            type: 'SET_FIELD',
            field: 'ramiAmount',
            value: value ? (parseFloat(value) / USDT_EXCHANGE_RATE).toFixed(1) : ''
        })
    }, [])

    const handleRAMIChange = useCallback((value: string) => {
        dispatch({ type: 'SET_FIELD', field: 'ramiAmount', value })
        dispatch({
            type: 'SET_FIELD',
            field: 'usdtAmount',
            value: value ? (parseFloat(value) * USDT_EXCHANGE_RATE).toFixed(3) : ''
        })
    }, [])

    const handleReferralCodeChange = useCallback((value: string) => {
        const sanitizedValue = value
            .replace(/[^A-Za-z]/g, '') // Remove non-alphabetic characters
            .toUpperCase()
            .slice(0, 6); // Explicitly limit to 6 characters

        dispatch({ type: 'SET_FIELD', field: 'referralCode', value: sanitizedValue })
        dispatch({
            type: 'SET_FIELD',
            field: 'isValidReferralCode',
            value: sanitizedValue.length === 6
        })
    }, [])

    const contextValue = useMemo(() => ({
        state,
        isAmountValid,
        isRamiAmountValid,
        isLoading,
        handleUSDTChange,
        handleRAMIChange,
        handleReferralCodeChange,
        handleGenerateCode,
        handleApproveUSDT,
        handlePurchase
    }), [
        state, isAmountValid, isRamiAmountValid, isLoading,
        handleUSDTChange, handleRAMIChange, handleReferralCodeChange,
        handleGenerateCode, handleApproveUSDT, handlePurchase
    ])

    return (
        <AffiliateContext.Provider value={contextValue}>
            {children}
        </AffiliateContext.Provider>
    )
}

export const useAffiliate = () => {
    const context = useContext(AffiliateContext)
    if (!context) throw new Error('useAffiliate must be used within AffiliateProvider')
    return context
}