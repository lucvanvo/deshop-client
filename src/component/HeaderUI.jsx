"use client"
export default function Header() {
    return (
        <header className="w-full h-[180px] bg-white flex items-center justify-center px-8 shadow-md">
            <div className="flex w-full max-w-4xl justify-between items-center">
                <div className="text-2xl font-bold">
                    <img src="/image/logo.png" alt="Logo" className="w-[350px] h-auto" />
                </div>
                <nav className="flex gap-16 text-[36px] font-bold text-[#DF564A]">
                    <a href="/" className="hover:text-red-500">Trang chủ</a>
                    <a href="/shopping" className="hover:text-red-500">Mua sắm</a>
                </nav>
            </div>
        </header>
    )
}