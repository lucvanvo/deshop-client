"use client";

import { useEffect, useState, useCallback } from "react";
import CategoryRow from "@/component/CategoryRow";

export default function CategoryTable() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm gọi API để lấy dữ liệu
    const fetchCategories = useCallback(async () => {
        setIsLoading(true); // Bắt đầu tải
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL);
            console.log(response);
            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.statusText}`);
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            setError(error.message);
        } finally {
            setIsLoading(false); // Kết thúc tải
        }
    }, []);

    // Gọi API ngay khi component được render
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (isLoading) {
        return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Đã xảy ra lỗi: {error}</p>;
    }
    if (categories.length === 0) {
        return <p className="text-center text-gray-500">Không có loại sản phẩm nào.</p>;
    }
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 ">Tên loại sản phẩm</th>
                        <th className="p-3 ">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <CategoryRow
                            key={category.id}
                            data={category}
                            refresh={fetchCategories} // Truyền hàm refresh xuống
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}