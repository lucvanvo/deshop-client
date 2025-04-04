"use client"

import OrderRow from "./OrderRow"

export default function OrderTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 border">Tên khách hàng</th>
                        <th className="p-3 border">Tổng tiền</th>
                        <th className="p-3 border">Ngày mua</th>
                        <th className="p-3 border">Cập nhật</th>
                        <th className="p-3 border">Xem chi tiết hóa đơn</th>
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