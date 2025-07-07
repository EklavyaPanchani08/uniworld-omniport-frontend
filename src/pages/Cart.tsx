import { useSelector } from "react-redux"
import CartItem from "../components/cart-item"
import OrderDialog from "../components/order-dialog"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import Spinner from "../components/ui/spinner"
import { type CartItem as CartItemType } from "../lib/types"

export default function Cart() {
  const { items: carts, loading, error } = useSelector((state: any) => state.cart);

  const getTotalPrice = () => {
    return carts.reduce((total: number, item: CartItemType) => {
      return total + item.discountPrice * item.quantity;
    }, 0);
  }
  if (loading) return <div className="w-fit mx-auto"><Spinner /></div>;
  if (error) return <div className="w-fit mx-auto text-red-700">Error: {error}</div>;

  // EMPTY CART
  if (carts.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {carts.map((item: CartItemType) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <Card className="bg-card border-border transition-colors">
            <CardHeader>
              <CardTitle className="text-card-foreground">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-card-foreground">
                <span>Subtotal</span>
                <span>${getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-card-foreground">
                <span>Shipping</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between font-semibold text-lg text-card-foreground">
                <span>Total</span>
                <span className="text-primary">${getTotalPrice().toLocaleString()}</span>
              </div>
              <OrderDialog />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
