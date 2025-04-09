"use client";

export default function CategoryRow({ data, onEdit, onDelete }) {
    return (
        <tr>
            <td className="p-3">{data.name}</td>
            <td className="p-3 flex gap-2">
                <button
                    onClick={onEdit}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    Sửa
                </button>
                <button
                    onClick={onDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
}