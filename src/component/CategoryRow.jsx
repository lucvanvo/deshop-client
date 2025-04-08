"use client";

export default function CategoryRow({ data, refresh }) {
    const handleEdit = () => {
        console.log(`Sửa loại sản phẩm: ${data.name}`);
        // Logic sửa loại sản phẩm
    };

    const handleDelete = async () => {
    };

    return (
        <tr className=" transition-all text-white">
            <td className="p-3 border">{data?.name}</td>
            <td className="p-3 border flex gap-4">
                <button
                    onClick={handleEdit}
                    className="bg-yellow-400 px-4 py-1 rounded"
                >
                    Sửa
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
}