import OrderTable from "@/component/OrderTable"
import { title } from "process"

export const metadata = {
    title: "Quản lý hóa đơn"
}

export default function OrderPage() {
    return (
        <>
            <OrderTable />
        </>
    )
}