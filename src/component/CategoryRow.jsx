"use client";

import Button from "@/component/Button"; // Import Button component
export default function CategoryRow({ stt, data, onEdit, onDelete }) {
    return (
        <tr>
            <td className="p-2 text-center">{stt}</td>
            <td className="p-2">{data.name}</td>
            <td className="p-2 flex gap-2">
                <Button
                    text="Sửa"
                    onClick={onEdit}
                    className="w-[80px] h-[30px] text-[14px] bg-yellow-300" // Điều chỉnh kích cỡ nút
                />
                <Button
                    text="Xóa"
                    onClick={onDelete}
                    className="w-[80px] h-[30px] text-[14px] bg-red-600" // Điều chỉnh kích cỡ nút
                />
            </td>
        </tr>
    );
}