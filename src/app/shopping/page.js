"use client"

import HeaderSearch from "@/component/HeaderSearch"
import TopProducts from "@/component/TopProducts"

export default function ShoppingPage() {
    return (
        <div>
            <HeaderSearch />
            <Headerr />
            <TopProducts />
        </div>
    )
}


const Headerr = () => {
    return (
        <div className="bg-[#FFF7EB]">
            <h1 className="text-[36px] text-[#FF564A] font-bold text-center">
                Sản phẩm nổi bật!
            </h1>
        </div>

    )
}