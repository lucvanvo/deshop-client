"use client"

export default function SwitchAuth({ a, b, link }) {
    return (
        <div className="text-center mt-4">
            <p className="text-[#000000]">
                {a}
                <a href={link} className="text-[#FF5758]"> {b}</a>
            </p>
        </div >
    )
}