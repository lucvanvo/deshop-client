"use client"

import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"
import ProductTable from "@/component/ProductTable"

export default function Home() {
    return (
        <div>
            <HeaderAdmin />
            <MenuAdmin />
            <ProductTable />
        </div>
    )
}