"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import Button from "./Button";

export default function HeaderCart({ step }) {
    const router = useRouter(); // Khởi tạo router

    const handleBack = () => {
        router.push("/shopping"); // Quay lại trang trước đó
    };

    return (
        <div className="w-[700px] flex items-center gap-3 p-3 bg-white rounded-md shadow mb-4">
            <div className="">
                <Button text="Quay lại" onClick={handleBack} className="w-auto h-auto bg-red-500 p-1" /> {/* Gọi hàm handleBack */}
            </div>
            <div className="text-base font-semibold flex-1 text-center">
                <h2 className="text-black">{step}</h2>
            </div>
        </div>
    );
}