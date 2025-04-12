"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter để điều hướng
import CartSummary from "@/component/CartSummary";
import HeaderCart from "@/component/HeaderCart";
import ProductInCart from "@/component/ProductInCart";

export default function CartPage() {
    const router = useRouter(); // Khởi tạo router để điều hướng
    const [products, setProducts] = useState([
        { id: 1, image: "image/catsrang5kg.jpg", name: "Catsrang 5kg", price: 465000, quantity: 1, isSelected: false },
        { id: 2, image: "image/catsrang5kg.jpg", name: "Catsrang 5kg", price: 465000, quantity: 1, isSelected: false },
        { id: 3, image: "image/catsrang5kg.jpg", name: "Catsrang 5kg", price: 465000, quantity: 1, isSelected: false },
        { id: 4, image: "image/catsrang5kg.jpg", name: "Catsrang 5kg", price: 465000, quantity: 1, isSelected: false },
    ]);

    const handleSelectProduct = (id, isSelected) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, isSelected } : product
            )
        );
    };

    const handleQuantityChange = (id, newQuantity) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
    };

    const handleSelectAll = (isSelected) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) => ({ ...product, isSelected }))
        );
    };

    const handleCheckout = () => {
        const selectedProducts = products.filter((product) => product.isSelected);
        if (selectedProducts.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
            return;
        }

        // Lưu sản phẩm đã chọn vào localStorage
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

        // Chuyển hướng sang trang /pay
        router.push("/pay");
    };

    const totalPrice = products
        .filter((product) => product.isSelected)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);

    const totalItems = products
        .filter((product) => product.isSelected)
        .reduce((sum, product) => sum + product.quantity, 0);

    const isAllSelected = products.every((product) => product.isSelected);

    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-6">
            <HeaderCart step="Giỏ hàng" />
            {products.map((product) => (
                <div key={product.id} className="flex items-center text-black">
                    <ProductInCart
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        initialQuantity={product.quantity}
                        isSelected={product.isSelected}
                        onSelect={(isSelected) => handleSelectProduct(product.id, isSelected)}
                        onQuantityChange={(newQuantity) => handleQuantityChange(product.id, newQuantity)}
                    />
                </div>
            ))}
            <div>
                <CartSummary
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    onCheckout={handleCheckout}
                    onSelectAll={(isSelected) => handleSelectAll(isSelected)}
                    isAllSelected={isAllSelected}
                />
            </div>
        </div>
    );
}