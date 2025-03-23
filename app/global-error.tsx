// app/global-error.tsx
"use client";

import Image from "next/image";

export default function GlobalError({
}: {
  error: Error;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-hidden mt-[15dvh]">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-64 h-64">
            <Image src="/wifi.svg" alt="500 Server Error" width={500} height={500} />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#fd3ff4]">Global Error</h1>
            <p className="mt-4 text-lg font-normal text-[#fd3ff4]">Try again by reloading the page.</p>
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
      </body>
    </html>
  );
}