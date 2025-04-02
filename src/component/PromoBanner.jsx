"use client"

import BuyNowButton from "./BuyNowButton";

export default function PromoBanner() {
    return (
        <div className="w-full h-[320px] flex items-center bg-cover bg-center px-8"
            style={{ backgroundImage: "url('/image/bg_cat.jpg')" }}>
            <div className="w-1/2 text-white">
                <h2 className="text-4xl font-bold mb-4">Tiết kiệm tuyệt vời</h2>
                <p className="text-[28px] mb-6">
                    Đừng bỏ lỡ ưu đãi trong thời gian giới hạn của chúng tôi và giảm giá độc quyền.
                </p>
                <BuyNowButton />
            </div>
        </div>
    );
}