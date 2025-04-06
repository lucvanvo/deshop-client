import ProductTable from "@/component/ProductTable"
import { title } from "process"
export const metadata = {
    title: "Quản lý sản phẩm"
}
export default function ProductPage() {
    return (
        <>
            <ProductTable />
        </>
    )


}