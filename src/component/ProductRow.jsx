"use client"

import Button from "./Button"

export default function ProductRow({ stt, data, onEdit, onDelete }) {
    return (
        <tr className="border border-white">
            <td className="p-3 border border-white text-center">{stt}</td>
            <td className="p-3 border border-white">{data.name}</td>
            <td className="p-3 border border-white">{data.description}</td>
            <td className="p-3 border border-white">{data.price.toLocaleString()} VND</td>
            <td className="p-3 border border-white">{data.categoryName}</td>
            <td className="p-3 border border-white">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="w-16 h-16 object-cover rounded"
                />
            </td>
            <td className="p-3 border border-white">
                <div className="flex justify-center gap-2">
                    <Button
                        text="Sửa"
                        onClick={onEdit}
                        className="w-[80px] h-[30px] text-[14px] bg-yellow-300"
                    />
                    <Button
                        text="Xóa"
                        onClick={onDelete}
                        className="w-[80px] h-[30px] text-[14px] bg-red-600"
                    />
                </div>
            </td>
        </tr>
    )
}