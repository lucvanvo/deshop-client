"use client"

import ProductRow from "./ProductRow"

export default function ProductTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 border">Tên sản phẩm</th>
                        <th className="p-3 border">Mô tả</th>
                        <th className="p-3 border">Giá</th>
                        <th className="p-3 border">Loại</th>
                        <th className="p-3 border">Hình ảnh</th>
                        <th className="p-3 border">Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    <ProductRow />
                    <ProductRow />
                    <ProductRow />
                </tbody>
            </table>
        </div>
    )
}