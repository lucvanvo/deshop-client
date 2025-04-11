"use client";

import { useState, useEffect } from "react";

export default function AddProductPopup({ onAdd, onEdit, onClose, editingProduct }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL);
                if (!res.ok) throw new Error("Không thể tải danh sách loại sản phẩm.");
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Lỗi khi tải loại sản phẩm:", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (editingProduct) {
            setForm({
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                price: editingProduct.price || "",
                category: editingProduct.categoryId || "",
                image: null, // ảnh mới sẽ chọn lại
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price, category, image } = form;

        if (!name || !price || !category) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("categoryId", category);
        if (image) formData.append("image", image);

        try {
            const url = editingProduct
                ? `${process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL}/${editingProduct.id}`
                : process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL;

            const response = await fetch(url, {
                method: editingProduct ? "PUT" : "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Lỗi từ API:", errorData);
                throw new Error("Không thể xử lý sản phẩm.");
            }

            const product = await response.json();
            editingProduct ? onEdit(product) : onAdd(product);
            alert(editingProduct ? "Sửa sản phẩm thành công!" : "Thêm sản phẩm thành công!");
            onClose();
        } catch (error) {
            console.error("Lỗi:", error);
            alert(editingProduct ? "Lỗi khi sửa sản phẩm." : "Lỗi khi thêm sản phẩm.");
        }
    };

    return (
        <div className="fixed inset-0 flex backdrop-blur-sm items-center justify-center text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-bold text-center mb-4">
                    {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Nhập mô tả"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full"
                        />
                        {editingProduct?.imageUrl && !form.image && (
                            <p className="text-sm text-gray-500 mt-1">Giữ nguyên ảnh cũ: {editingProduct.imageUrl}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {editingProduct ? "Sửa" : "Thêm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
