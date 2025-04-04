
import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"

export default function AdminLayout({ children }) {
    return <div>
        <HeaderAdmin />
        <MenuAdmin />
        {children}
    </div>
}
