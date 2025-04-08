'use client';
import AddButton from "@/component/AddButton";
import ProductTable from "@/component/ProductTable";
import { useState } from "react";

export default function ProductPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddProduct = () => {
        // Logic thêm sản phẩm
        console.log("Product added!");
        togglePopup(); // Đóng popup sau khi thêm
    };

    return (
        <>
            <AddButton nameFunc="Thêm sản phẩm" onClick={togglePopup} />
            <ProductTable />

            {isPopupOpen && (
                <AddProductPopup
                    onAdd={handleAddProduct}
                    onClose={togglePopup}
                />
            )}
        </>
    );
}

function AddProductPopup({ onAdd, onClose }) {
    return (
        <div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-labelledby="popup-title"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-black">
                <h3 id="popup-title" className="text-lg font-medium text-center text-red-600">
                    Thêm sản phẩm mới
                </h3>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Tên sản phẩm"
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="number"
                        placeholder="Giá sản phẩm"
                        className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Loại"
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Hình ảnh"
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Lưu
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
}
