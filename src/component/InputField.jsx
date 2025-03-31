"use client"
export default function InputField({ type, label, value, onChange }) {
    return (
        <div>
            <label className="block mb-1 text-12px font-medium text-black text-left">{label}</label>
            <input
                className="w-[350px] h-[40px] text-black px-4 border border-black rounded-[8px] bg-[#D9D9D9]"
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}