"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng

export default function PayPage() {
    const router = useRouter(); // Khởi tạo router để điều hướng
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu sản phẩm đã chọn từ localStorage
        const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        setSelectedProducts(products);
    }, []);

    const totalPrice = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-6 text-black">
            <div className="w-full max-w-[700px] bg-white p-4 rounded-lg shadow-md relative">
                {/* Nút Hủy */}
                <button
                    onClick={() => router.push("/Cart")} // Điều hướng quay lại trang giỏ hàng
                    className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                    Hủy
                </button>

                <h2 className="text-xl font-bold text-center mb-4">Thanh toán</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Tên: Võ Văn Lực</h3>
                    <p className="text-sm">SDT: 0333620950</p>
                    <p className="text-sm">Địa chỉ: Số 123 Trần Quang Diệu, Phường An Thới, Quận Bình Thủy, Cần Thơ</p>
                </div>
                {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 mb-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-red-500 text-sm">{product.price.toLocaleString()} vnd</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">x{product.quantity}</span>
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-lg font-semibold">Tổng thanh toán</span>
                    <span className="text-red-500 text-xl font-bold">{totalPrice.toLocaleString()} vnd</span>
                </div>
                <button
                    onClick={() => alert("Đặt hàng thành công!")}
                    className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition"
                >
                    Đặt hàng
                </button>
            </div>
        </div>
    );
}