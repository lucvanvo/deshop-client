"use client";

import SearchBar from "./SearchBar";

export default function HeaderSearch({ onSearch }) {
    return (
        <header className="flex items-center justify-between p-4 bg-white border-b">
            <div className="flex flex-col items-center">
                <img src="/image/logo.png" alt="Dẻ's Shop" className="w-[200px] h-[100px]" />
            </div>

            <div className="">
                {/* Truyền hàm onSearch vào SearchBar */}
                <SearchBar onSearch={onSearch} />
            </div>

            <div className="flex items-center gap-4">
                <img src="image/cart_icon.jpg" alt="Giỏ hàng" className="w-16 h-16" />
                <div className="flex flex-col gap-2">
                    <AuthButton label="Đăng Nhập" color="bg-red-500" />
                    <AuthButton label="Đăng Ký" color="bg-red-500" />
                </div>
            </div>
        </header>
    );
}

const AuthButton = ({ label, color }) => {
    return (
        <button className={`${color} text-white px-4 py-2 rounded-md font-bold hover:opacity-80 transition duration-300`}>
            {label}
        </button>
    );
};