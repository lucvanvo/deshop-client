"use client"

import HeaderCart from "@/component/HeaderCart"
import ProductInCart from "@/component/ProductInCart"

export default function Home() {
    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-6">
            <HeaderCart step="Giỏ hàng" />
            <div className="flex items-center text-black">
                <ProductInCart image="image/catsrang5kg.jpg" name="Catsrang 5kg"
                    price="465.000 vnd"
                    quantity={1} />
            </div>
            <div className="flex items-center text-black">
                <ProductInCart image="image/catsrang5kg.jpg" name="Catsrang 5kg"
                    price="465.000 vnd"
                    quantity={1} />
            </div>
            <div className="flex items-center text-black">
                <ProductInCart image="image/catsrang5kg.jpg" name="Catsrang 5kg"
                    price="465.000 vnd"
                    quantity={1} />
            </div>
            <div className="flex items-center text-black">
                <ProductInCart image="image/catsrang5kg.jpg" name="Catsrang 5kg"
                    price="465.000 vnd"
                    quantity={1} />
            </div>
        </div>
    )
}