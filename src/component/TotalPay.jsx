"use client"
export default function TotalPay({ totalPay }) {
    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Tổng thanh toán:</h3>
                <span className="text-xl font-bold text-green-500">{totalPay} VNĐ</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Đặt hàng
            </button>
        </div>

    )
}