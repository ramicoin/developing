'use client'

import Image from "next/image";
import Link from 'next/link';

export default function AffiliateLandingPage() {

  const scrollToHowItWorks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    { id: 1, title: "Connect Wallet", description: "Connect your crypto wallet to open your dashboard." },
    { id: 2, title: "Generate Referral Code", description: "Referral Code is required to join the program." },
    { id: 3, title: "Share Your Code", description: "Invite your investors and network to join using your referral code." },
    { id: 4, title: "Earn Rewards", description: "Get 3% of all the invested amount by your referred investors in real-time." },
  ];

  const benefits = [
    { title: "Share and Earn Ramicoin", description: "Earn generous rewards by sharing your referral code with friends and network." },
    { title: "Trade Ramicoin", description: "Freely trade Ramicoin on supported exchanges with low fees." },
    { title: "Earn Passive Income", description: "Get stable passive income in USDT of our profits from Bitcoin and Gold trading." },
  ];

  return (
    <div className="relative w-full min-h-screen mt-[15dvh] flex flex-col items-center px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Hero Section - Bento Inspired */}
      <div className="w-full max-w-7xl mt-24 lg:mt-16 grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7 space-y-6 lg:space-y-8">
          <div className="inline-flex px-4 py-2 bg-[#fd30f2]/10 rounded-full backdrop-blur-sm">
            <span className="text-lg font-medium text-[#fd30f2]">Ramicoin Affiliate Program</span>
          </div>
          <h1 className="text-5xl md:w-[60dvw] lg:text-7xl lg:w-[55dvw] xl:w-[45dvw] font-bold tracking-tight bg-gradient-to-r from-[#fd30f2] to-[#ff6ec4] bg-clip-text text-transparent">
            Monetize Your Network in Web3
          </h1>
          <p className="text-xl md:w-[65dvw] lg:w-[50dvw] xl:w-[45dvw] md:text-2xl lg:text-2xl text-gray-600 font-medium">
            Transform your connections into sustainable crypto earnings through our decentralized affiliate system
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={scrollToHowItWorks}
              className="flex justify-center items-center space-x-2 px-8 py-4 bg-[#fd30f2] hover:bg-[#ff28e0] text-white font-medium rounded-xl transition-all transform hover:-translate-y-1"
            >
              <span className="text-2xl">How It Works</span>
              <Image src="/wheart.svg" alt="logo" width={35} height={35} />
            </button>
            <Link href="/refer/dashboard" className="text-2xl text-center px-8 py-4 border-2 border-[#fd30f2] text-[#fd30f2] font-medium rounded-xl hover:bg-[#fd30f210] transition-all">
              Dashboard Access
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 mt-8 lg:mt-0 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#fd30f2]/10 to-[#ff6ec4]/10">
          <Image
            src="/rami-hands.svg"
            alt="Affiliate Visual"
            fill
            className="object-contain object-center scale-125"
          />
        </div>
      </div>

      <h1 id="how-it-works" className="text-4xl font-bold px-6 mt-16 lg:text-5xl lg:mt-28 scroll-mt-28">How It Works ?</h1>
      {/* How It Works - Bento Grid */}
      <div className="w-full max-w-7xl mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step) => (
          <div key={step.id} className="group p-6 lg:p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-[#f933ef]/20 hover:border-[#f933ef]/50 transition-all">
            <div className="w-12 h-12 lg:w-16 lg:h-16 mb-6 flex items-center justify-center bg-[#fd30f2]/10 rounded-xl text-2xl lg:text-3xl font-bold text-[#fd30f2] border-2 border-[#f933ef]">
              {step.id}
            </div>
            <h3 className="text-2xl lg:text-2xl font-semibold mb-3">{step.title}</h3>
            <p className="text-2xl text-gray-600 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Benefits - Ethereum-like Bento Layout */}
      <div className="w-full max-w-7xl mt-10 grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#fd30f2]/5 to-[#ff6ec4]/5 backdrop-blur-sm border border-white/10">
          <div className="max-w-xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Program Benefits</h2>
            <p className="text-xl text-gray-700 mb-8">
              Leverage decentralized finance mechanics to maximize your earning potential
            </p>
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 p-2 flex items-center justify-center bg-[#fd30f2]/10 rounded-full text-[#fd30f2]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600 text-xl lg:text-2xl mt-1">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-[#5436fd]/5 to-[#f426dc]/5 backdrop-blur-sm border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 mb-8 flex items-center justify-center bg-[#5436fd]/10 rounded-xl text-[#5436fd]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Real-time Analytics</h3>
            <p className="text-gray-600 text-xl mb-8">
              Track your referrals and earnings through our transparent blockchain-powered dashboard
            </p>
          </div>
          <Link href="/refer/dashboard" className="bg-[#5436fd] text-center py-3 px-2 rounded-lg text-2xl flex justify-center items-center text-[#faf9fb]/80 hover:text-white transition-colors">
            <span className="lg:hidden">View Dashboard</span>
            <span className="hidden lg:block">Dashboard</span>
            <svg className="w-6 h-8 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      {/* CTA Section - Bento Style */}
      <div className="w-full max-w-7xl mt-5 lg:mt-16 mb-16 lg:mb-24 p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-[#fd30f2]/10 to-[#5436fd]/10 backdrop-blur-sm border border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl lg:text-4xl font-bold mb-6">Start Earning Today</h2>
          <p className="text-2xl text-gray-600 mb-8">
            Join thousands of web3 enthusiasts already benefiting from our affiliate network
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/refer/dashboard"
              className="flex justify-center items-center space-x-2 px-8 py-4 bg-[#fd30f2] hover:bg-[#ff28e0] text-white text-xl font-medium rounded-xl transition-all transform hover:-translate-y-1"
            >
              <span>Get Started Now</span>
              <Image src="/wheart.svg" alt="logo" width={35} height={35} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
