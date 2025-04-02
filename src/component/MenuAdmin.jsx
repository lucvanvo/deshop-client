"use client"
export default function MenuAdmin() {
    return (
        <div className="w-full h-[45px] bg-gray-300 flex items-center justify-around">
            <button className="w-1/5 h-full text-lg font-semibold text-white bg-[#DF564A] hover:opacity-80 transition">
                Quản Lý Sản Phẩm
            </button>
            <button className="w-1/5 h-full text-lg font-semibold text-white bg-[#DF564A]  hover:opacity-80 transition">
                Quản Lý Loại Sản Phẩm
            </button>
            <button className="w-1/5 h-full text-lg font-semibold text-white bg-[#DF564A]  hover:opacity-80 transition">
                Quản Lý Hóa Đơn
            </button>
            <button className="w-1/5 h-full text-lg font-semibold text-white bg-[#DF564A]  hover:opacity-80 transition">
                Quản Lý Khách Hàng
            </button>
            <button className="w-1/5 h-full text-lg font-semibold text-white bg-[#DF564A]  hover:opacity-80 transition">
                Đăng Xuất
            </button>
        </div>
    )
}