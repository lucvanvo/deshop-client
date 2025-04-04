"use client"

import BuyNowButton from "./BuyNowButton"

export default function TopProducts({ name, price, description }) {
    return (
        <div className="w-full h-[300px] bg-white shadow-lg flex items-center justify-center px-8">
            <div className="w-1/2 flex justify-center">
                <img src="image/catsrang5kg.jpg" className="w-[300px] h-[300px] object-cover rounded-lg" />
            </div>
            <div className="w-1/2 text-black text-[24px] flex flex-col gap-4">
                <p>Tên sản phẩm: {name}</p>
                <p>Giá sản phẩm: {price}</p>
                <p>Mô tả: {description}</p>
                <BuyNowButton />
            </div>
        </div>
    )
}
