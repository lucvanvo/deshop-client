import CustomerTable from "@/component/CustomerTable"
import { title } from "process"

export const metadata = {
    title: "Quản lý khách hàng"
}

export default function CustomerPage() {
    return (
        <>
            <CustomerTable />
        </>
    )
}