
const SearchBar = () => {
    return (
        <div className="flex items-center justify-center py-4">
            <input 
                type="text"
                placeholder="Digite aqui"
                className="w-96 border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
};

export default SearchBar;
