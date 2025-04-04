"use client"
export default function OrderDetailRow() {
    return (
        <tr>
            <td>01</td>
            <td>Bát đựng thức ăn</td>
            <td>1</td>
            <td>40.000</td>
            <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 px-4 py-1 rounded">Sửa</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Xóa</button>
            </td>
        </tr>
    )
}