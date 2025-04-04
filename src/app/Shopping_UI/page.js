"use client"

import HeaderSearch from "@/component/HeaderSearch"
import Header from "@/component/HeaderUI"
import ProductTable from "@/component/ProductTable"
import TopProducts from "@/component/TopProducts"

export default function Shopping_UI() {
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