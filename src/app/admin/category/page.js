'use client'
import Button from "@/component/Button";
import CategoryTable from "@/component/CategoryTable";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmPopup from "@/component/ConfirmPopup";

export default function CategoryPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // Xác định chế độ sửa
    const [editingCategory, setEditingCategory] = useState(null); // Lưu loại sản phẩm đang sửa
    const [newCategoryName, setNewCategoryName] = useState(""); // State để lưu tên loại sản phẩm mới
    const tableRef = useRef(null); // Tạo ref để gọi hàm refresh từ CategoryTable
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State để điều khiển popup
    const [successMessage, setSuccessMessage] = useState(""); // State để lưu nội dung thông báo
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // State để điều khiển popup xác nhận
    const [categoryToDelete, setCategoryToDelete] = useState(null); // State để lưu loại sản phẩm cần xóa
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

            setNewCategoryName(""); // Reset input
            setIsPopupOpen(false); // Đóng popup
            setIsEditMode(false); // Thoát chế độ sửa
            setEditingCategory(null);

            //Hiển thị popup thành công
            setSuccessMessage(isEditMode ? "Sửa loại sản phẩm thành công!" : "Thêm loại sản phẩm thành công!");
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 2000); // Ẩn popup sau 3 giây


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
        setCategoryToDelete(categoryId); // Lưu loại sản phẩm cần xóa
        setShowConfirmPopup(true); // Hiển thị popup xác nhận
    };

    const confirmDeleteCategory = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PROXY_CATEGORY_API_URL}/${categoryToDelete}`, // Sử dụng categoryToDelete
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Lỗi khi xóa loại sản phẩm.");
            }

            // Hiển thị thông báo thành công
            setSuccessMessage("Xóa loại sản phẩm thành công!");
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 2000); // Ẩn popup sau 3 giây

            // Gọi hàm refresh từ CategoryTable để cập nhật danh sách
            if (tableRef.current) {
                tableRef.current();
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Đã xảy ra lỗi khi xóa loại sản phẩm.");
        } finally {
            setShowConfirmPopup(false); // Ẩn popup xác nhận
            setCategoryToDelete(null); // Reset loại sản phẩm cần xóa
        }
    };

    return (
        <>
            <Button text="Thêm loại sản phẩm" onClick={togglePopup} className="bg-blue-500 text-white px-4 py-2 mb-4 m-1 hover:bg-blue-600 rounded" />
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
            {showConfirmPopup && (
                <ConfirmPopup
                    message="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
                    onConfirm={confirmDeleteCategory}
                    onCancel={() => setShowConfirmPopup(false)}
                />
            )}
            {
                <AnimatePresence>
                    {showSuccessPopup && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{successMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            }
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
                    {/* <button
                        onClick={onAdd}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {isEditMode ? "Lưu thay đổi" : "Lưu"}
                    </button> */}
                    <Button text={isEditMode ? "Lưu thay đổi" : "Lưu"} onClick={onAdd} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" />
                    {/* <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Đóng
                    </button> */}
                    <Button text="Đóng" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400" />
                </div>
            </div>
        </div>
    );
}