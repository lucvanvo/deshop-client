import CategoryTable from "@/component/CategoryTable";
import { title } from "process";

export const metadata = {
    title: "Quản lý loại sản phẩm"

}

export default function CategoryPage() {
    return (
        <>
            <CategoryTable />
        </>
    )

}