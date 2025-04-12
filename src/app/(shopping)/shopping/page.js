"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/component/ProductCard";
import HeaderSearch from "@/component/HeaderSearch";

export default function ShoppingPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Hàm load danh sách sản phẩm
    const refreshProducts = async () => {
        setIsLoading(true);
        setError(""); // Reset lỗi trước khi gọi API
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL);
            if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");
            const data = await response.json();
            setProducts(data); // Cập nhật danh sách sản phẩm
            setFilteredProducts(data); // Hiển thị tất cả sản phẩm ban đầu
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error);
            setError(error.message); // Lưu lỗi để hiển thị
        } finally {
            setIsLoading(false); // Tắt trạng thái tải
        }
    };

    // Gọi API khi component được mount
    useEffect(() => {
        refreshProducts();
    }, []);

    // Hàm xử lý tìm kiếm
    const handleSearch = (keyword) => {
        if (!keyword) {
            setFilteredProducts(products); // Hiển thị tất cả sản phẩm nếu không có từ khóa
        } else {
            const lowerKeyword = keyword.toLowerCase();
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(lowerKeyword)
            );
            setFilteredProducts(filtered); // Cập nhật danh sách sản phẩm được lọc
        }
    };

    // Hiển thị trạng thái đang tải
    if (isLoading) {
        return <div className="text-center">Đang tải...</div>;
    }

    // Hiển thị lỗi nếu có
    if (error) {
        return <div className="text-center text-red-500">Lỗi: {error}</div>;
    }

    // Hiển thị danh sách sản phẩm
    return (
        <div className="p-4 bg-cyan-100">
            {/* Truyền handleSearch vào HeaderSearch */}
            <HeaderSearch onSearch={handleSearch} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {filteredProducts.length === 0 ? (
                    <div className="text-center col-span-full">Không có sản phẩm nào.</div>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}