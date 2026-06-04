function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <h2>Search Leads</h2>

      <input
        type="text"
        placeholder="Search by Name, Email or Company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;