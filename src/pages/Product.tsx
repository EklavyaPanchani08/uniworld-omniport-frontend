import { Heart, ShoppingCart, Star } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Placeholder from "../assets/images/placeholder.png"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import Spinner from "../components/ui/spinner"
import { addToCart } from "../redux/features/cart/cartSlice"
import { fetchProductStart } from "../redux/features/product/productSlice"
import { useNavigate } from "react-router-dom"

export default function Product() {
  const navigator = useNavigate();
  // PRODUCT API PROCESS
  const dispatch = useDispatch();
  const { item: product, loading, error } = useSelector(
    (state: any) => state.product
  );
  useEffect(() => {
    dispatch(fetchProductStart());
  }, [dispatch]);

  
  // DISCOUNT PROCESS
  const discountPercentage = product.price
  ? Math.round(((product.price - (product?.discountPrice || 0)) / (product.price || 1)) * 100)
  : 0
  
  // CART PROCESS
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  }
  // BUY NOW PROCESS
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigator("/cart");
  }
  if (loading) return <div className="w-fit mx-auto"><Spinner /></div>;
  if (error) return <div className="w-fit mx-auto text-red-700">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg bg-muted/30 dark:bg-muted/10">
            <img
              src={product.image || Placeholder}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-96 object-cover transition-transform hover:scale-105"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-foreground">{product.name}</h1>
            {/* STATIC RATING */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 dark:fill-yellow-500 dark:text-yellow-500" />
                <Star className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">${product.discountPrice}</span>
            {product.price !== product.discountPrice  && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.price}
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="text-primary ">
                {discountPercentage}% off
              </span>
            )}
          </div>

          <Separator className="bg-border" />

          <div>
            <h3 className="font-semibold mb-2 text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          {/* STATIC CONTENT */}
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Features</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Premium materials and construction</li>
              <li>Professional casino-grade quality</li>
              <li>Easy assembly with included hardware</li>
              <li>1-year manufacturer warranty</li>
            </ul>
          </div>

          <Separator className="bg-border" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} variant="outline" size="lg" className="flex-1 bg-transparent border-border hover:bg-accent py-2">
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-border hover:bg-accent hover:text-primary"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
