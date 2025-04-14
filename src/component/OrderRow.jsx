"use client";

import { useState } from "react";
import Button from "./Button";
import Link from "next/link";

export default function OrderRow({ name, phoneNumber, email, address, status: initialStatus, totalPrice, orderId, onDelete }) {
    const [status, setStatus] = useState(initialStatus); // Trạng thái đơn hàng
    const [loading, setLoading] = useState(false); // Trạng thái loading khi cập nhật

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value; // Lấy trạng thái mới từ dropdown
        setStatus(newStatus); // Cập nhật trạng thái tạm thời trên giao diện
        setLoading(true); // Hiển thị trạng thái loading

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL}/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }), // Gửi trạng thái mới
            });

            if (!response.ok) {
                throw new Error("Lỗi khi cập nhật trạng thái");
            }

            const result = await response.json();
            console.log("Đã cập nhật trạng thái:", result.message);
            alert("Cập nhật trạng thái thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Không thể cập nhật trạng thái đơn hàng.");
            setStatus(initialStatus); // Khôi phục lại trạng thái ban đầu nếu lỗi
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <tr>
            <td className="p-4 border-b">{name}</td>
            <td className="p-4 border-b">{phoneNumber}</td>
            <td className="p-4 border-b">{email}</td>
            <td className="p-4 border-b">{address}</td>
            <td className="p-4 border-b">
                <select
                    value={status} // Hiển thị trạng thái hiện tại
                    onChange={handleStatusChange} // Xử lý khi thay đổi trạng thái
                    className="border rounded px-2 py-1 text-red-600 disabled:opacity-50"
                    disabled={loading} // Vô hiệu hóa dropdown khi đang loading
                >
                    <option value="NEW">Mới</option>
                    <option value="PROCESSING">Đang xử lý</option>
                    <option value="COMPLETED">Hoàn thành</option>
                    <option value="CANCELLED">Đã hủy</option>
                </select>
            </td>
            <td className="p-4 border-b">{totalPrice ? `${totalPrice.toLocaleString()} vnd` : "Chưa cập nhật"}</td>
            <td className="p-4 border-b">
                {/* Chuyển hướng đến trang chi tiết đơn hàng khi nhấn vào nút "Xem chi tiết" */}
                <Link href={`/order/${orderId}`} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">Xem chi tiết</Link>
            </td>
            <td className="p-4 border-b">
                <Button
                    text="Xóa"
                    onClick={() => onDelete(orderId)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                />
            </td>
        </tr>
    );
}