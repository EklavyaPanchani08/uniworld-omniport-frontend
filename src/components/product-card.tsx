import { ShoppingCart } from "lucide-react"
import { useDispatch } from "react-redux"
import Placeholder from "../assets/images/placeholder.png"
import { CartItem, Product } from "../lib/types"
import { addToCart } from "../redux/features/cart/cartSlice"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

  // CART PROCESS
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product as CartItem));
  }

  // DISCOUNT PROCESS
  const discountPercentage = product.price
    ? Math.round(((product.price - (product.discountPrice || 0)) / product.price) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 dark:hover:shadow-primary/20">
      <CardContent className="p-0">
        <a href={`/product/${product.id}`}>
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || Placeholder}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </a>
        <div className="p-4">
          <a href={`/product/:${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 transition-colors">{product.name}</h3>
          </a>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">${product.discountPrice.toLocaleString()}</span>
            {product.price !== product.discountPrice  && <span className="text-sm text-muted-foreground line-through">
              ${product.price.toLocaleString()}
            </span>}
            {discountPercentage > 0 && (
              <span className="text-primary text-sm">
                {discountPercentage}% off
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
