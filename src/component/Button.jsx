"use client"
export default function Button({ text, onClick }) {

    return (
        <button
            className="w-[350px] h-[40px] bg-[#FF5758] text-white text-[16px] rounded-[8px] hover:opacity-80 transition"
            onClick={onClick}
        >
            {text}
        </button>
    )
}