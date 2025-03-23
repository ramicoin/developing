

import Image from "next/image";
import { FC } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    referralLink: string;  // Add this line
}

const ShareModal: FC<ModalProps> = ({ isOpen, onClose, referralLink }) => {
    if (!isOpen) return null;

    const toggleCross = () => {
        onClose()
    }

    const handleTwitterShare = () => {
        const shareText = encodeURIComponent("Join me on Rami using my referral link! 🚀");
        const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referralLink)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    const handleWhatsappShare = () => {
        try {
            const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                `Your referral message - ${referralLink}`
            )}`;

            const windowRef = window.open(
                shareUrl,
                'WhatsAppShare',
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
            );

            if (!windowRef || windowRef.closed) {
                throw new Error('Popup blocked - please allow popups');
            }
        } catch (error) {
            console.error('WhatsApp share failed:', error);
            // Fallback to clipboard copy
            navigator.clipboard.writeText(referralLink);
        }
    };

    const handleTelegramShare = () => {
        const shareText = encodeURIComponent("Join me on Rami using my referral link! 🚀");
        const shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="absolute bent-card top-0 h-full right-0 w-full z-30 col-span-4 bg-[#fd3ff4] p-2 rounded-3xl shadow-xl border-b-4 border-[#ffffff]">
            <div className="h-full flex flex-col justify-between md:flex-row md:items-center">
                <div className="py-3 flex justify-between items-center px-4 md:hidden">
                    <h1 className="text-3xl font-bold text-[#ffffff]">Share & Earn</h1>
                    <Image onClick={toggleCross} src="/cross.svg" alt="x" width={40} height={40} />
                </div>

                {/* Desktop Header (hidden on mobile) */}
                <div className="hidden md:block md:w-[10%] md:h-full md:py-4">
                    <div className="flex justify-between items-start h-full flex-col">
                        <h1 className="text-3xl font-bold text-[#ffffff] md:rotate-180 md:[writing-mode:vertical-rl]">
                            Share & Earn
                        </h1>
                        <Image className="cursor-pointer" onClick={toggleCross} src="/cross.svg" alt="x" width={40} height={40} />
                    </div>
                </div>

                {/* Image Container */}
                <div className="rounded-2xl p-2 md:w-[60%] lg:w-[55%]">
                    <div className="flex justify-center items-center w-full max-w-[500px] md:max-w-full mx-auto">
                        <Image 
                            src="/friend.svg" 
                            alt="Referral friends" 
                            width={950} 
                            height={600}
                            className="w-full h-auto lg:scale-125"
                        />
                    </div>
                </div>

                {/* Social Buttons */}
                <div className="rounded-2xl p-2 md:w-[30%] lg:w-[25%]">
                    <div className="flex justify-center items-center gap-3 md:flex-col md:gap-6">
                        <button
                            onClick={handleTwitterShare}
                            className="w-[20%] md:w-[60%] lg:w-[50%] flex justify-center items-center rounded-xl"
                        >
                            <Image src="/share/twitter.svg" alt="x" width={80} height={80} />
                        </button>
                        <button
                            onClick={handleWhatsappShare}
                            className="w-[20%] md:w-[60%] lg:w-[50%] flex justify-center items-center rounded-xl"
                        >
                            <Image src="/share/wtp.svg" alt="whatsapp" width={50} height={50} />
                        </button>
                        <button
                            onClick={handleTelegramShare}
                            className="w-[20%] md:w-[60%] lg:w-[50%] flex justify-center items-center rounded-xl"
                        >
                            <Image src="/share/telegram.svg" alt="telegram" width={50} height={50} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
