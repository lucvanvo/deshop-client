"use client"
export default function ProductRow() {
    return (
        <tr>
            <td>Catsrang 5kg</td>
            <td>Thức ăn mèo xuất sứ Hàn Quốc</td>
            <td>465.000 VND</td>
            <td>Thức ăn</td>
            <td>
                <img src="image/catsrang5kg.jpg" alt="Catsrang 5kg" className="w-16 h-16" />
            </td>
            <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 px-4 py-1 rounded">Sửa</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Xóa</button>
            </td>
        </tr>
    )
}