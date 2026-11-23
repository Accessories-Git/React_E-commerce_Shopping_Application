import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { fetchCategories, fetchProducts } from "../features/products/productsSlice";

function Home() {
  const dispatch = useDispatch();
  const { items, status, error, categories, categoriesStatus } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  useEffect(() => {
    if (categoriesStatus === "idle") dispatch(fetchCategories());
  }, [categoriesStatus, dispatch]);

  // Search by name, filter by category, then sort by price
  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = items.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch = product.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "high-low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [items, searchTerm, category, sortOrder]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("all");
    setSortOrder("none");
  };

  return (
    <section>
      <div className="page-heading">
        <h1>Shop all products</h1>
        <p>Find something you like, add it to your cart and check out when you are ready.</p>
      </div>

      <SearchFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {status === "loading" && <Loader message="Loading products..." />}

      {status === "failed" && <ErrorMessage message={error} onRetry={() => dispatch(fetchProducts())} />}

      {status === "succeeded" && (
        <>
          <p className="result-count">
            Showing {visibleProducts.length} of {items.length} products
          </p>

          {visibleProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products match your search.</p>
              <button type="button" className="btn btn--outline" onClick={resetFilters}>
                Reset filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default Home;
