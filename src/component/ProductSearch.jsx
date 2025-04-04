"use client"

export default function ProductSearch({ image, name, price }) {
    return (
        <div className="border rounded-xl p-2 shadow-md text-center w-60 bg-white">
            <img src="image/catsrang5kg.jpg" className="w-full h-48 object-cover rounded-lg" />
            < div className="bg-rose-50 p-3 rounded-b-xl">
                <h3 className="text-rose-700 font-semibold italic">{name}</h3>
                <p className="text-2xl font-bold text-rose-800">{price}</p>
                <Button />
            </div >
        </div >
    )
}

function Button() {
    return (
        <div>
            <button className="mt-3 bg-rose-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-rose-600">
                Thêm vào giỏ hàng
            </button>
        </div>
    )
}