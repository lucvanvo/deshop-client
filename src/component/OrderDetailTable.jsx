"use client"

import OrderDetailRow from "./OrderDetailRow"
import OerderDetailRow from "./OrderDetailRow"

export default function OrderDetailTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 border">Mã hóa đơn</th>
                        <th className="p-3 border">Tên sản phẩm</th>
                        <th className="p-3 border">Số lượng</th>
                        <th className="p-3 border">Giá tiền</th>
                        <th className="p-3 border">Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderDetailRow />
                    <OrderDetailRow />
                </tbody>
            </table>
        </div>
    )
}