"use client"

import CategoryTable from "@/component/CategoryTable"
import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"

export default function Home() {
    return (
        <div>
            <HeaderAdmin />
            <MenuAdmin />
            <CategoryTable />
        </div>
    )
}