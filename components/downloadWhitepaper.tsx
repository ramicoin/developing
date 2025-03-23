"use client";

import { useState } from "react";
import Image from "next/image";

const DownloadButton = () => {
    const [downloaded, setDownloaded] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleDownload = (type: "mobile" | "desktop") => {
        const fileUrl =
            type === "mobile"
                ? "whitepaper/m-ramicoin-whitepaper.pdf"
                : "whitepaper/d-ramicoin-whitepaper.pdf"; // Update with actual paths

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileUrl.split("/").pop() || "download.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloaded(true);
        setShowOptions(false); // Hide options after download
    };

    return (
        <div className="relative flex flex-col items-center">
            {/* Download Button */}
            <button
                onClick={() => setShowOptions(!showOptions)}
                className="w-11 h-11 mt-[3dvh] mb-[3dvh] transition-all duration-300"
            >
                <Image
                    src={downloaded ? "/tick.svg" : "/download.svg"}
                    alt={downloaded ? "Downloaded" : "Download"}
                    width={100}
                    height={100}
                />
            </button>

            {/* Animated Dropdown Options */}
            <div
                className={`p-2 flex justify-center items-center space-x-3 transition-all duration-500 transform ${showOptions ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                    } origin-top bg-white shadow-lg rounded-xl border border-gray-200 w-[80dvw]`}
            >
                <button
                    onClick={() => handleDownload("mobile")}
                    className="flex justify-center items-center space-x-1 p-6 border-r-2 w-full text-left text-black hover:bg-gray-200 rounded-br-xl rounded-tr-xl transition-all duration-300"
                >
                    <Image src="/mobile.svg" alt="Mobile" width={25} height={25} />
                    <span className="font-medium">Mobile</span>
                </button>
                <button
                    onClick={() => handleDownload("desktop")}
                    className="flex justify-center items-center space-x-2 p-6 border-l-2 w-full text-left text-black hover:bg-gray-200 rounded-bl-xl rounded-tl-xl transition-all duration-300"
                >
                    <Image src="/desktop.svg" alt="Desktop" width={25} height={25} />
                    <span className="font-medium">Desktop</span>
                </button>
            </div>
        </div>
    );
};

export default DownloadButton;

