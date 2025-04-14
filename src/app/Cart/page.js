"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CartSummary from "@/component/CartSummary";
import HeaderCart from "@/component/HeaderCart";
import ProductInCart from "@/component/ProductInCart";

export default function CartPage() {
    const router = useRouter();

    const [products, setProducts] = useState([]);

    // Load cart từ localStorage chỉ sau khi component được render (client-side)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const cartData = localStorage.getItem("cart");
            if (cartData) {
                const parsed = JSON.parse(cartData).map(item => ({
                    ...item,
                    isSelected: item.isSelected ?? false,
                }));
                setProducts(parsed);
            }
        }
    }, []);

    const handleSelectProduct = (id, isSelected) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, isSelected } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleQuantityChange = (id, newQuantity) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, quantity: newQuantity } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleSelectAll = (isSelected) => {
        const updatedProducts = products.map((product) => ({
            ...product,
            isSelected,
        }));
        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleCheckout = () => {
        const selectedProducts = products.filter((product) => product.isSelected);
        if (selectedProducts.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để mua.");
            return;
        }

        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        router.push("/pay");
    };

    const totalPrice = products
        .filter((product) => product.isSelected)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);

    const totalItems = products
        .filter((product) => product.isSelected)
        .reduce((sum, product) => sum + product.quantity, 0);

    const isAllSelected = products.length > 0 && products.every((product) => product.isSelected);

    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-6">
            <HeaderCart step="Giỏ hàng" />
            {products.map((product) => (
                <div key={product.id} className="flex items-center text-black">
                    <ProductInCart
                        image={`/api/images/${encodeURIComponent(product.imageUrl)}`} // sửa tại đây
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
