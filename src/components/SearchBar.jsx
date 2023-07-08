const SearchBar = ({ handleSearch }) => {
    return (
        <div>
            <input type="text" placeholder="Search by title" onChange={(e) => handleSearch(e.target.value)} />
        </div>
    );

};

export default SearchBar;