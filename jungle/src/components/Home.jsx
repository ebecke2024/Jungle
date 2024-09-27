import { useContext } from "react";
import { SearchContext } from "./../App";
import ProductList from "./Product";

export default function Home() {
  const searchQuery = useContext(SearchContext);
  return (
    <div>
      <ProductList searchQuery={searchQuery} />
    </div>
  );
}