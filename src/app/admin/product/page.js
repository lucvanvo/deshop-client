"use client";

import { useState, useEffect } from "react";
import Button from "@/component/Button";
import ProductTable from "@/component/ProductTable";
import AddProductPopup from "@/component/AddProductPopup";

export default function ProductPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null); // Sản phẩm đang được sửa
    const [products, setProducts] = useState([]);

    // Hàm gọi API để lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL);
            if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Lỗi khi tải sản phẩm:", error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Hàm thêm sản phẩm
    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    // Hàm sửa sản phẩm
    const handleEditProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    // Hàm xóa sản phẩm
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL}/${productId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Không thể xóa sản phẩm.");
            }

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            alert("Xóa sản phẩm thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error.message);
            alert("Đã xảy ra lỗi khi xóa sản phẩm.");
        }
    };

    // Hàm mở popup sửa sản phẩm
    const handleOpenEditPopup = (product) => {
        setEditingProduct(product);
        setIsPopupOpen(true);
    };

    return (
        <>
            <Button
                text="Thêm sản phẩm"
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => {
                    setEditingProduct(null); // Đặt về null để thêm sản phẩm mới
                    setIsPopupOpen(true);
                }}
            />

            <ProductTable
                products={products}
                onEdit={handleOpenEditPopup}
                onDelete={handleDeleteProduct}
            />

            {isPopupOpen && (
                <AddProductPopup
                    onAdd={handleAddProduct}
                    onEdit={handleEditProduct}
                    onClose={() => setIsPopupOpen(false)}
                    editingProduct={editingProduct}
                />
            )}
        </>
    );
}