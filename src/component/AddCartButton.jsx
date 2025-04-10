'use client'

export default function AddCartButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
        >
            Thêm vào giỏ hàng
        </button>
    );
}