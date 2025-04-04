"use client"
export default function Address({ name, address, phone }) {
    return (
        <div className="w-[700px] bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-base font-semibold text-gray-800">{name}</span>
                <span className="text-base text-gray-600">{phone}</span>
            </div>
            <div className="text-sm text-gray-700">
                {address}
            </div>
        </div>
    )
}