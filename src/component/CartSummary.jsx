"use client";

export default function CartSummary({ totalPrice, totalItems, onCheckout, onSelectAll, isAllSelected }) {
    return (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[700px] flex items-center justify-between bg-white p-4 shadow-md border-t border-red-500 z-50 rounded-lg text-black">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={isAllSelected} // Hiển thị trạng thái "Tất cả" đã được chọn hay chưa
                    onChange={(e) => onSelectAll(e.target.checked)} // Xử lý chọn tất cả sản phẩm
                />
                <span className="text-lg font-semibold">Tất cả</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">Tổng thanh toán</span>
                <span className="text-red-500 text-xl font-bold">{totalPrice.toLocaleString()} vnd</span>
                <button
                    onClick={onCheckout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                    Mua Hàng ({totalItems})
                </button>
            </div>
        </div>
    );
}