'use client'
import AddButton from "@/component/AddButton";
import CategoryTable from "@/component/CategoryTable";
import { useState, useRef } from "react";

export default function CategoryPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Xác định chế độ sửa
    const [editingCategory, setEditingCategory] = useState(null); // Lưu loại sản phẩm đang sửa
    const [newCategoryName, setNewCategoryName] = useState(""); // State để lưu tên loại sản phẩm mới
    const tableRef = useRef(null); // Tạo ref để gọi hàm refresh từ CategoryTable

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddOrEditCategory = async () => {
        if (!newCategoryName.trim()) {
            alert("Tên loại sản phẩm không được để trống!");
            return;
        }

        try {
            const url = isEditMode
                ? `${process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL}/${editingCategory.id}`
                : process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL;

            const method = isEditMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newCategoryName }),
            });

            if (!response.ok) {
                throw new Error(
                    `Lỗi khi ${isEditMode ? "sửa" : "thêm"} loại sản phẩm: ${response.statusText}`
                );
            }

            alert(`${isEditMode ? "Sửa" : "Thêm"} loại sản phẩm thành công!`);
            setNewCategoryName(""); // Reset input
            setIsPopupOpen(false); // Đóng popup
            setIsEditMode(false); // Thoát chế độ sửa
            setEditingCategory(null);

            // Gọi hàm refresh từ CategoryTable để cập nhật danh sách
            if (tableRef.current) {
                tableRef.current();
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert(`Đã xảy ra lỗi khi ${isEditMode ? "sửa" : "thêm"} loại sản phẩm.`);
        }
    };

    const handleEditCategory = (category) => {
        setIsEditMode(true);
        setEditingCategory(category);
        setNewCategoryName(category.name);
        setIsPopupOpen(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?")) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL}/${categoryId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Lỗi khi xóa loại sản phẩm.");
            }

            alert("Xóa loại sản phẩm thành công!");

            // Gọi hàm refresh từ CategoryTable để cập nhật danh sách
            if (tableRef.current) {
                tableRef.current();
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đã xảy ra lỗi khi xóa loại sản phẩm.");
        }
    };

    return (
        <>
            <AddButton nameFunc="Thêm loại sản phẩm" onClick={togglePopup} />
            <CategoryTable
                ref={tableRef}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
            />

            {isPopupOpen && (
                <AddCategoryPopup
                    onAdd={handleAddOrEditCategory}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setIsEditMode(false);
                        setEditingCategory(null);
                    }}
                    categoryName={newCategoryName}
                    setCategoryName={setNewCategoryName}
                    isEditMode={isEditMode}
                />
            )}
        </>
    );
}

function AddCategoryPopup({
    onAdd,
    onClose,
    categoryName,
    setCategoryName,
    isEditMode,
}) {
    return (
        <div
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center"
            role="dialog"
            aria-labelledby="popup-title"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] text-black">
                <h3 id="popup-title" className="text-lg font-medium text-center text-red-600">
                    {isEditMode ? "Sửa loại sản phẩm" : "Thêm loại sản phẩm"}
                </h3>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Tên loại sản phẩm"
                        value={categoryName} // Liên kết với state
                        onChange={(e) => setCategoryName(e.target.value)} // Cập nhật state
                        className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {isEditMode ? "Lưu thay đổi" : "Lưu"}
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