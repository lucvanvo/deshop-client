"use client"

import OrderRow from "./OrderRow"

export default function OrderTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-red-500 text-white">
                    <tr>
                        <th className="p-4 border-b">Tên khách hàng</th>
                        <th className="p-4 border-b">Tổng tiền</th>
                        <th className="p-4 border-b">Ngày mua</th>
                        <th className="p-4 border-b">Xem chi tiết hóa đơn</th>
                    </tr>
                </thead>
                <tbody>
                    <OrderRow />
                    <OrderRow />
                    <OrderRow />
                </tbody>
            </table>
        </div>
    )
}