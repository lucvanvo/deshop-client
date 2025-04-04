"use client"

import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"
import OrderDetailTable from "@/component/OrderDetailTable"

export default function Home() {
    return (
        <div>
            <HeaderAdmin />
            <MenuAdmin />
            <OrderDetailTable />
        </div>
    )
}