import HeaderSearch from "@/component/HeaderSearch";

export default function ShoppingLayout({ children }) {
    return <div>
        <HeaderSearch />
        {children}
    </div>
}