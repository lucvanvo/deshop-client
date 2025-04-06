
import HeaderAdmin from "@/component/HeaderAdmin"
import MenuAdmin from "@/component/MenuAdmin"
import { title } from "process"

export const metadata = {
    title: {
        template: '%s | Dẻ\'s Shop',
        default: 'Dẻ\s Shop'
    }
}

export default function AdminLayout({ children }) {
    return <div>
        <HeaderAdmin />
        <MenuAdmin />
        {children}
    </div>
}
