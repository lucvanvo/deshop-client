'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function MenuAdmin() {
    const router = useRouter();
    const pathname = usePathname();

    const getButtonClass = (path) => {
        const isActive = pathname === path;
        return `
            w-1/5 h-full text-lg font-semibold text-white 
            ${isActive ? 'bg-[#000000]' : 'bg-[#DF564A]'} 
            hover:opacity-80 transition
        `;
    };

    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    }

    return (
        <>
            <div className="w-full h-[45px] bg-gray-300 flex items-center justify-around">
                <button onClick={() => router.push('/admin/product')} className={getButtonClass('/admin/product')}>
                    Quản Lý Sản Phẩm
                </button>
                <button onClick={() => router.push('/admin/category')} className={getButtonClass('/admin/category')}>
                    Quản Lý Loại Sản Phẩm
                </button>
                <button onClick={() => router.push('/admin/order')} className={getButtonClass('/admin/order')}>
                    Quản Lý Hóa Đơn
                </button>
                <button onClick={() => router.push('/admin/customer')} className={getButtonClass('/admin/customer')}>
                    Quản Lý Khách Hàng
                </button>
                <button onClick={() => setShowLogoutPopup(true)} className={getButtonClass('/admin/logout')}>
                    Đăng Xuất
                </button>
            </div>

            {
                showLogoutPopup && (
                    <ConfirmLogoutPopup onConfirm={handleLogout} onCancel={() => setShowLogoutPopup(false)} />
                )
            }
        </>
    );
}

function ConfirmLogoutPopup({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-50 bg-white w-[320px] p-6 rounded-xl shadow-xl text-center space-y-4 animate-fade-in">
                <h2 className="text-xl font-bold text-red-600">Bạn có chắc chắn muốn đăng xuất không?</h2>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                        onClick={onConfirm}
                    >
                        Đăng Xuất
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>

                </div>
            </div>
        </div>
    )
}