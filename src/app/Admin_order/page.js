"use client"

import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"
import OrderTable from "@/component/OrderTable"

export default function Home() {
    return (
        <div>
            <HeaderAdmin />
            <MenuAdmin />
            <OrderTable />
        </div>
    )
}