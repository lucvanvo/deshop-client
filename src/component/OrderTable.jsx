"use client";

import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";

export default function OrderTable() {
    const [orders, setOrders] = useState([]); // Quản lý danh sách đơn hàng
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    // Hàm lấy danh sách đơn hàng từ API
    const fetchOrders = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL); // Gọi API GET lấy danh sách đơn hàng
            if (!response.ok) throw new Error("Không thể tải dữ liệu đơn hàng");
            const data = await response.json();
            setOrders(data); // Cập nhật state orders
        } catch (error) {
            console.error("Lỗi khi tải đơn hàng:", error);
        } finally {
            setLoading(false);
        }
    };

    // Lấy đơn hàng khi component được load lần đầu
    useEffect(() => {
        fetchOrders();
    }, []);

    // Hàm xử lý xóa đơn hàng
    const handleDeleteOrder = async (orderId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL}/${orderId}`, {
                method: "DELETE",
            });

            console.log(response.status);
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result?.error || `Lỗi khi xóa hóa đơn: ${response.statusText}`);
            }

            // Sau khi xóa thành công, gọi lại fetchOrders để làm mới danh sách đơn hàng
            alert("Xóa hóa đơn thành công!");
            fetchOrders(); // Gọi lại hàm fetchOrders để tải lại bảng
        } catch (error) {
            console.error("Lỗi khi xóa hóa đơn:", error);
            alert(error.message || "Xóa hóa đơn thất bại.");
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Đang tải dữ liệu...</div>;
    }

    if (orders.length === 0) {
        return <div className="p-4 text-center">Không có đơn hàng nào.</div>; // Hiển thị khi không có đơn hàng
    }

    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse text-left shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-red-500 text-white">
                    <tr>
                        <th className="p-4 border-b">Tên khách hàng</th>
                        <th className="p-4 border-b">Số điện thoại</th>
                        <th className="p-4 border-b">Email</th>
                        <th className="p-4 border-b">Địa chỉ</th>
                        <th className="p-4 border-b">Trạng thái</th>
                        <th className="p-4 border-b">Tổng tiền</th>
                        <th className="p-4 border-b">Xem chi tiết</th>
                        <th className="p-4 border-b">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        console.log("Trạng thái từ API:", order.status); // Kiểm tra trạng thái từ API
                        return (
                            <OrderRow
                                key={order.id}
                                name={order.orderPersonName}
                                phoneNumber={order.phoneNumber}
                                email={order.email}
                                address={order.address}
                                status={order.status} // Truyền trạng thái từ API
                                totalPrice={order.totalPrice}
                                orderId={order.id}
                                onDelete={handleDeleteOrder}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
