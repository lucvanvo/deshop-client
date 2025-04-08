'use client'

export default function AddButton({ nameFunc, onClick }) {
    return (
        <button onClick={onClick} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition m-1">{nameFunc}</button>
    )
}