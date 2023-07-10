const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <input
        style={{ width: "100%" }}
        type="text"
        placeholder="Search by title"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
