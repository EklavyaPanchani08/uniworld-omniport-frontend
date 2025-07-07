import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./product-card";
import { fetchProductsStart } from "../redux/features/products/productsSlice";
import Spinner from "./ui/spinner";

export default function ProductGrid() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state: any) => state.products
  );
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  if (loading) return <div className="w-fit mx-auto"><Spinner/></div>;
  if (error) return <div className="w-fit mx-auto text-red-700">Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}