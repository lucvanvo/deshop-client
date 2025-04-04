"use client"
export default function CustomerRow() {
    return (
        <tr>
            <td>vovanluc2k4</td>
            <td>lucdepzai2004@#</td>
            <td>Võ Văn Lực</td>
            <td>vovanluc2k4@gmail.com</td>
            <td>0123456789</td>
            <td>123 Nguyễn Văn Cừ, An Khánh, Ninh Kiều, TP. Cần Thơ</td>
            <td className="p-2 flex gap-2">
                <button className="bg-yellow-400 px-4 py-1 rounded">Sửa</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Xóa</button>
            </td>
            <td><button className="bg-yellow-400 px-4 py-1 rounded">Đặt lại password</button></td>
        </tr>
    )
}