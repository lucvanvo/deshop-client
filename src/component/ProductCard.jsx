"use client";

import { useState } from "react";
import Button from "./Button";

export default function ProductCard({ product }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const imageSrc = product.imageUrl
        ? `/api/images/${encodeURIComponent(product.imageUrl)}`
        : "/placeholder-image.png";

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    const toggleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <div className="w-[200px] h-[300px] perspective">
            <div className={`relative w-full h-full transition-transform duration-500 transform ${isFlipped ? "rotate-y-180" : ""}`}>
                {/* Mặt trước */}
                <div className="absolute w-full h-full backface-hidden bg-white shadow-md rounded-lg p-4 text-center">
                    <img
                        src={imageSrc}
                        alt={product.name || "Sản phẩm"}
                        className="w-[120px] h-[120px] object-contain mb-2 mx-auto"
                    />
                    <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-red-600 font-bold text-[16px] mb-2">
                        {product.price.toLocaleString()}<sup>đ</sup>
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button
                            text="Thêm vào giỏ hàng"
                            onClick={handleAddToCart}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        />
                        <Button
                            text="Xem mô tả"
                            onClick={toggleFlip}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                        />
                    </div>
                </div>

                {/* Mặt sau */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-50 shadow-md rounded-lg p-4 text-center flex flex-col justify-between">
                    <div className="overflow-auto text-sm text-gray-700 mb-4">
                        {product.description || "Không có mô tả sản phẩm."}
                    </div>
                    <Button
                        text="Đóng"
                        onClick={toggleFlip}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                    />
                </div>
            </div>
        </div>
    );
}
