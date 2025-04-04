"use client"
export default function CategoryRow() {
    return (
        <tr>
            <td>Thức ăn</td>
            <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 px-4 py-1 rounded">Sửa</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Xóa</button>
            </td>
        </tr>
    )
}