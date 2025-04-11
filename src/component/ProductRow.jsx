"use client"

import Button from "./Button"

export default function ProductRow({ stt, data, onEdit, onDelete }) {
    return (
        <tr>
            <td className="p-3 border text-center">{stt}</td>
            <td className="p-3 border">{data.name}</td>
            <td className="p-3 border">{data.description}</td>
            <td className="p-3 border">{data.price} VND</td>
            <td className="p-3 border">{data.category}</td>
            <td className="p-3 border">
                <img src={data.image} alt={data.name} className="w-auto h-auto object-cover" />
            </td>
            <td className="p-2 justify-center">
                <Button
                    text="Sửa"
                    onClick={onEdit}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                />
                <Button
                    text="Xóa"
                    onClick={onDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                />
            </td>
        </tr>
    )
}