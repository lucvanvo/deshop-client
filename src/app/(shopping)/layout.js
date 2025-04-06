import HeaderSearch from "@/component/HeaderSearch";

export default function ShoppingLayout({ children }) {
    return <div>
        <HeaderSearch />
        {children}
    </div>
}

const Headerr = () => {
    return (
        <div className="bg-[#FFF7EB]">
            <h1 className="text-[36px] text-[#FF564A] font-bold text-center">
                Sản phẩm nổi bật!
            </h1>
        </div>

    )
}