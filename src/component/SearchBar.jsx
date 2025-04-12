'use client';

export default function SearchBar({ onSearch }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.search.value.trim();
        onSearch(keyword); // Gửi từ khóa tìm kiếm đến ShoppingPage
    };

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-[500px] h-[50px]"
        >
            <input
                type="text"
                name="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-grow bg-transparent outline-none px-2 text-gray-700"
            />
            <button
                type="submit"
                className="bg-[#DF564A] text-white w-[75px] h-[40px] p-2 rounded-[8px] hover:bg-[#C44B40] transition duration-300"
            >
                🔍
            </button>
        </form>
    );
}