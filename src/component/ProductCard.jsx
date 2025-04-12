"use client";

import Button from "./Button";

export default function ProductCard({ product }) {
    // Đường dẫn hình ảnh, sử dụng API hoặc hình ảnh mặc định nếu không có
    const imageSrc = product.imageUrl
        ? `/api/images/${encodeURIComponent(product.imageUrl)}`
        : "/placeholder-image.png"; // Hình ảnh mặc định

    const handleAddToCart = () => {
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    };

    return (
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 text-center">
            <img
                src={imageSrc} // Đường dẫn hình ảnh
                alt={product.name || "Sản phẩm"} // Mô tả hình ảnh
                className="w-[120px] h-[120px] object-contain mb-2"
            />
            <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
            <p className="text-red-600 font-bold text-[16px] mb-2">
                {product.price.toLocaleString()}<sup>đ</sup>
            </p>
            <Button text="Thêm vào giỏ hàng" onClick={handleAddToCart} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm" />
        </div>
    );
}