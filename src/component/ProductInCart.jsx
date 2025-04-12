"use client";

import { useState } from "react";

export default function ProductInCart({ image, name, price, initialQuantity = 1, isSelected, onSelect, onQuantityChange }) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity); // Gọi callback để cập nhật số lượng trong `CartPage`
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity); // Gọi callback để cập nhật số lượng trong `CartPage`
        }
    };

    const handleSelect = () => {
        onSelect(!isSelected); // Gọi callback để cập nhật trạng thái chọn
    };

    const totalPrice = price * quantity; // Tính giá tiền dựa trên số lượng

    return (
        <div className="w-[700px] h-[300px] flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            <input
                type="checkbox"
                className="w-5 h-5"
                checked={isSelected}
                onChange={handleSelect} // Xử lý chọn sản phẩm
            />

            <img src={image} alt={name} className="w-32 h-32 object-cover rounded-lg" />

            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-red-500 text-xl font-bold">{totalPrice.toLocaleString()} vnd</p> {/* Hiển thị giá tiền thay đổi */}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={handleDecrease}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold"
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                    onClick={handleIncrease}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold"
                >
                    +
                </button>
            </div>
        </div>
    );
}