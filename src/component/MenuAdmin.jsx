'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Button from './Button';

export default function MenuAdmin() {
    const router = useRouter();
    const pathname = usePathname();
    const getButtonClass = (path) => {
        const isActive = pathname === path;
        return `
            w-full p-3 text-sm sm:text-base text-white font-semibold text-center rounded-lg
            ${isActive ? 'bg-black' : 'bg-[#DF564A]'} 
            hover:opacity-80 transition
        `;
    };

    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    }

    return (
        <>
            <div className="w-full bg-white py-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
                    <Link href="/admin/product" className={getButtonClass('/admin/product')}>
                        Quản Lý Sản Phẩm
                    </Link>
                    <Link href="/admin/category" className={getButtonClass('/admin/category')}>
                        Quản Lý Loại Sản Phẩm
                    </Link>
                    <Link href="/admin/order" className={getButtonClass('/admin/order')}>
                        Quản Lý Đơn Hàng
                    </Link>
                    {/* <Link href="/admin/customer" className={getButtonClass('/admin/customer')}>
                    Quản Lý Khách Hàng
                </Link> */}
                    <button onClick={() => setShowLogoutPopup(true)} className={getButtonClass('/admin/logout')}>
                        Đăng Xuất
                    </button>
                </div>
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
            <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

            <div className="relative z-50 bg-white w-[320px] p-6 rounded-xl shadow-xl text-center space-y-4 animate-fade-in">
                <h2 className="text-xl font-bold text-red-600">Bạn có chắc chắn muốn đăng xuất không?</h2>

                <div className="flex justify-center gap-4 mt-4">
                    <Button text="Đăng xuất" onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition" />
                    <Button text="Đóng" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition" />
                </div>
            </div>
        </div>
    )
}