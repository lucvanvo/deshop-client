"use client";

import { useState, useEffect } from "react";
import Button from "@/component/Button";
import ProductTable from "@/component/ProductTable";
import AddProductPopup from "@/component/AddProductPopup";

export default function ProductPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // Load danh sách sản phẩm
    const refreshProducts = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL);
            if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error);
        }
    };

    useEffect(() => {
        refreshProducts();
    }, []);

    const handleAddProduct = (newProduct) => {
        setProducts((prev) => [...prev, newProduct]);
    };

    const handleUpdateProduct = async () => {
        alert("Sửa sản phẩm thành công!");
        refreshProducts();
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL}/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Không thể xóa sản phẩm.");

            alert("Xóa sản phẩm thành công!");
            refreshProducts();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Lỗi khi xóa sản phẩm.");
        }
    };

    return (
        <>
            <Button
                text="Thêm sản phẩm"
                className="bg-blue-500 text-white px-4 py-2 mb-4 hover:bg-blue-600"
                onClick={() => {
                    setEditingProduct(null);
                    setIsPopupOpen(true);
                }}
            />

            <ProductTable
                products={products}
                onEdit={(product) => {
                    setEditingProduct(product);
                    setIsPopupOpen(true);
                }}
                onDelete={(productId) => {
                    handleDeleteProduct(productId);
                }}
            />

            {isPopupOpen && (
                <AddProductPopup
                    editingProduct={editingProduct}
                    onAdd={(newProduct) => {
                        handleAddProduct(newProduct);
                        refreshProducts();
                    }}
                    onEdit={(updatedProduct) => {
                        handleUpdateProduct(updatedProduct); // truyền sản phẩm đã cập nhật về
                    }}
                    onClose={() => {
                        setIsPopupOpen(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </>
    );
}
