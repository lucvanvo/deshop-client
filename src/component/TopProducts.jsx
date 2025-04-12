"use client"

import Button from "./Button"
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
                <Button text="Mua ngay"
                    className="bg-red-500 text-white px-6 py-2 rounded-md text-[26px] w-[175px] h-[60px] font-bold hover:bg-red-600" />
            </div>
        </div>
    )
}
