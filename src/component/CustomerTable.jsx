"use client"

import CustomerRow from "./CustomerRow"

export default function CustomerTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 border">Tài khoản</th>
                        <th className="p-3 border">Mật khẩu</th>
                        <th className="p-3 border">Họ và tên</th>
                        <th className="p-3 border">Email</th>
                        <th className="p-3 border">Điện thoại</th>
                        <th className="p-3 border">Địa chỉ</th>
                        <th className="p-3 border">Cập nhật</th>
                        <th className="p-3 border">Reset Password</th>
                    </tr>
                </thead>
                <tbody>
                    <CustomerRow />
                    <CustomerRow />
                    <CustomerRow />
                </tbody>
            </table>
        </div>
    )
}   