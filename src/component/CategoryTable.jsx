"use client"

import CategoryRow from "./CategoryRow"

export default function CategoryTable() {
    return (
        <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border text-left">
                <thead className="bg-red-300 text-white">
                    <tr>
                        <th className="p-3 border">Tên loại sản phẩm</th>
                        <th className="p-3 border">Cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    <CategoryRow />
                    <CategoryRow />
                    <CategoryRow />
                </tbody>
            </table>
        </div>
    )
}