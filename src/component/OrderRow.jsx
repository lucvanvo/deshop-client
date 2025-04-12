"use client"
export default function OrderRow() {
    return (
        <tr>
            <td className="p-4 border-b">Võ Văn Lực</td>
            <td className="p-4 border-b">300.000</td>
            <td className="p-4 border-b">30/04/1975</td>
            <td className="p-4 border-b">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow transition">
                    Xem chi tiết
                </button>
            </td>
        </tr>
    )
}