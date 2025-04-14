"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import Button from "./Button";

export default function PetHavent() {
    const router = useRouter(); // Khởi tạo router

    const handleButtonClick = () => {
        router.push("/shopping"); // Điều hướng đến trang /shopping
    };

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
                    <p className="text-red-500 text-[32px] font-semibold">
                        Đồ dùng cho thú cưng,<br /> được chọn lọc hoàn hảo
                    </p>
                </div>
                <Button
                    text="Mua ngay"
                    className="bg-red-500 text-white px-6 py-2 rounded-md text-[26px] w-[175px] h-[60px] font-bold hover:bg-red-600"
                    onClick={handleButtonClick} // Gọi hàm điều hướng khi nhấn vào nút
                />
            </div>
        </div>
    );
}