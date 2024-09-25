import { useContext } from "react";
import { SearchContext } from "./../App";
import ProductList from "./Product";
import ProductDetail from "./ProductDetail";

export default function Home() {
  const searchQuery = useContext(SearchContext);
  return (
    <div>
      <ProductList searchQuery={searchQuery} />
      <ProductDetail></ProductDetail>
    </div>
  );
}