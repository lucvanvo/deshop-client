"use client"

import CustomerTable from "@/component/CustomerTable"
import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"

export default function Home() {
    return (
        <div>
            <HeaderAdmin />
            <MenuAdmin />
            <CustomerTable />
        </div>
    )
}