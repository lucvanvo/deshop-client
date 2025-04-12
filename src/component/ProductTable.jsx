"use client";

import Button from "./Button";

export default function ProductTable({ products, onEdit, onDelete }) {
    if (products.length === 0) {
        return <p className="text-center text-gray-500">Không có sản phẩm nào.</p>;
    }

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left text-sm">
                <thead className="bg-red-500 text-white">
                    <tr>
                        <th className="p-3 border">STT</th>
                        <th className="p-3 border">Tên sản phẩm</th>
                        <th className="p-3 border">Mô tả</th>
                        <th className="p-3 border">Giá</th>
                        <th className="p-3 border">Loại</th>
                        <th className="p-3 border">Hình ảnh</th>
                        <th className="p-3 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td className="p-3 border text-center">{index + 1}</td>
                            <td className="p-3 border">{product.name}</td>
                            <td className="p-3 border">{product.description}</td>
                            <td className="p-3 border">{product.price.toLocaleString()} VND</td>
                            <td className="p-3 border">{product.categoryName}</td>
                            <td className="p-3 border">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="p-3 border text-center">
                                <Button text="Sửa" onClick={() => onEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600" />
                                <Button text="Xóa" onClick={() => onDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}