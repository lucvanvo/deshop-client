"use client"

import BuyNowButton from "./BuyNowButton"

export default function PetHavent() {
    return (
        <div className="flex items-center justify-center gap-12 p-8 bg-white">
            <div className="w-[400px] h-[400px] flex items-center justify-center">
                <img src="image/dogandcat.png" alt="Pets" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-orange-100 px-6 py-2 rounded-lg">
                    <h2 className="text-red-500 text-[42px] font-bold">Thiên Đường Thú Cưng</h2>
                </div>
                <div className="bg-orange-100 px-4 py-2 rounded-md">
                    <p className="text-red-500 text-[32px] font-semibold">Đồ dùng cho thú cưng,<br /> được chọn lọc hoàn hảo</p>
                </div>
                <BuyNowButton />
            </div>
        </div>
    )
}