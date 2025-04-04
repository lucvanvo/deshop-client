export default function SearchBar() {
    return (
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-[500px] h-[50px]">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-grow bg-transparent outline-none px-2 text-gray-700"
            />
            <button className="bg-[#DF564A] text-white w-[75px] h-[40px] p-2 rounded-[8px] hover:bg-[#C44B40] transition duration-300">
                🔍
            </button>
        </div>
    );
}
