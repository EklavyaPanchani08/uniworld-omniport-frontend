import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Placeholder from "../assets/images/placeholder.png"
import { CartItem as CartType } from "../lib/types"
import { useDispatch } from "react-redux"
import { removeFromCart, updateQuantity } from "../redux/features/cart/cartSlice"

interface CartItemProps {
  item: CartType
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch();

  return (
    <Card className="bg-card border-border transition-colors hover:shadow-md dark:hover:shadow-primary/10">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={item.image || Placeholder}
              alt={item.name}
              className="w-20 h-20 object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 text-card-foreground">{item.name}</h3>
            <p className="text-primary font-semibold text-lg">${item.discountPrice.toLocaleString()}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(0, item.quantity - 1) }))}
                className="bg-transparent border-border hover:bg-accent"
                disabled={item.quantity === 1}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center font-medium text-card-foreground">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="bg-transparent border-border hover:bg-accent"
                disabled={item.quantity === 10} // STATIC LIMIT AS STOCK COUNT
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
