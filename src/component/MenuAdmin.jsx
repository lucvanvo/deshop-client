'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function MenuAdmin() {
    const router = useRouter();
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    // Hàm hỗ trợ tạo class cho từng nút
    const getButtonClass = (path) => {
        const isActive = pathname === path;
        return `
            w-1/5 h-full text-lg font-semibold text-white 
            ${isActive ? 'bg-[#000000]' : 'bg-[#DF564A]'} 
            hover:opacity-80 transition
        `;
    };

    return (
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
            <button onClick={() => router.push('/admin/logout')} className={getButtonClass('/admin/logout')}>
                Đăng Xuất
            </button>
        </div>
    );
}
