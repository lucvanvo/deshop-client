"use client"

import Address from "@/component/Address"
import HeaderCart from "@/component/HeaderCart"
import ProductInCart from "@/component/ProductInCart"
import TotalPay from "@/component/TotalPay"
export default function PaymentPage() {
    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] h-full py-6">
            <HeaderCart step="Thanh toán" />
            <div>
                <Address name="Nguyễn Văn A"
                    phone="0123 456 789"
                    address="123 Đường Lê Lợi, Phường 5, Quận 10, TP. Hồ Chí Minh" />
            </div>
            <div className="flex items-center text-black">
                <ProductInCart image="image/catsrang5kg.jpg" name="Catsrang 5kg"
                    price="465.000 vnd"
                    quantity={1} />
            </div>
            <div>
                <TotalPay totalPay="5000" />
            </div>
        </div >
    )
}