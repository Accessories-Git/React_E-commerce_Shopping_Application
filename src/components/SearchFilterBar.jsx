function SearchFilterBar({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__field filter-bar__field--search">
        <label htmlFor="search">Search by name</label>
        <input
          id="search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="filter-bar__field">
        <label htmlFor="category">Category</label>
        <select id="category" value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-bar__field">
        <label htmlFor="sort">Sort by price</label>
        <select id="sort" value={sortOrder} onChange={(event) => onSortChange(event.target.value)}>
          <option value="none">Default</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilterBar;
