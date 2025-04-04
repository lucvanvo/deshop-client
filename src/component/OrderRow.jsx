"use client"
export default function OrderRow() {
    return (
        <tr>
            <td>Võ Văn Lực</td>
            <td>300.000</td>
            <td>30/04/1975</td>
            <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 px-4 py-1 rounded">Sửa</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Xóa</button>
            </td>
            <td><button className="bg-yellow-400 px-4 py-1 rounded">Xem chi tiết</button></td>
        </tr>
    )
}