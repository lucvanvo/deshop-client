"use client";

import Button from "@/component/Button"; // Import Button component
export default function CategoryRow({ stt, data, onEdit, onDelete }) {
    return (
        <tr>
            <td className="p-4 border-b text-center">{stt}</td>
            <td className="p-4 border-b">{data.name}</td>
            <td className="p-4 border-b">
                <div className="flex justify-center gap-2">
                    <Button
                        text="Sửa"
                        onClick={onEdit}
                        className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition"
                    />
                    <Button
                        text="Xóa"
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                    />
                </div>
            </td>
        </tr>
    );
}