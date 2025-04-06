"use client"

export default function HeaderAdmin() {
    return (
        <div className="w-full h-[175px] bg-gray-200 flex items-center px-10 justify-center">
            <div className="w-1/2 flex justify-start">
                <img src="/image/logo.png" alt="Logo" className="w-[150px] h-auto" />
            </div>

            <div className="w-1/2 flex justify-center">
                <h1 className="text-3xl font-bold text-[#DF564A]">Trang Chủ Admin</h1>
            </div>
        </div>
    )
}