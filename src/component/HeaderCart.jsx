"use client"
export default function HeaderCart({ step }) {
    return (
        <div className="w-[700px] flex items-center gap-3 p-3 bg-white rounded-md shadow mb-4">
            <div className="">
                <Button />
            </div>
            <div className="text-base font-semibold flex-1 text-center">
                <h2 className="text-black">{step}</h2>
            </div>
        </div>
    )
}

function Button() {
    return (
        <button className="bg-red-500 text-white p-1.5 rounded-md flex items-center justify-center">
            Quay lại
        </button>
    )
}