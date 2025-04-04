"use client"
export default function ProductInCart({ image, name, price, quantity, onIncrease, onDecrease }) {
    return (
        <div className="w-[700px] h-[300px] flex items-center gap-4 bg-white p-4 rounded-lg shadow-md">
            <input type="checkbox" className="w-5 h-5" />

            <img src={image} alt={name} className="w-32 h-32 object-cover rounded-lg" />

            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-red-500 text-xl font-bold">{price}</p>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={onDecrease} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold">
                    -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button onClick={onIncrease} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md text-lg font-bold">
                    +
                </button>
            </div>
        </div>
    )
}