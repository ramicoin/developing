// app/error.tsx
"use client";

import Image from "next/image";


export default function Error() {
  return (
    <div className="flex flex-col space-y-3 min-h-screen items-center justify-center p-4">
      <div className="w-64 h-64">
        <Image src="/500.svg" alt="500 Server Error" width={500} height={500} />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-[#fd3ff4]">Client Error</h1>
        <p className="mt-4 text-lg font-normal text-[#fd3ff4]">Let's solve it by trying again.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-11 py-2 bg-[#fd3ff4] text-white font-normal
                cursor-pointer transition-all rounded-lg text-2xl
                border-[#f281f8] border-b-[4px] hover:brightness-110
                hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px]
                active:brightness-90 active:translate-y-[2px]"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}