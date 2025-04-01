"use client"

export default function SwitchAuth({ a, b }) {
    return (
        <div className="text-center mt-4">
            <p className="text-[#000000]">
                {a}
                <a href="./src/app" className="text-[#FF5758]"> {b}</a>
            </p>
        </div >
    )
}