import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { CartItem, Order, OrderItem } from "../lib/types"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { clearCart } from "../redux/features/cart/cartSlice"

export default function OrderDialog() {
  const { items: carts } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  })
  const orderItems: OrderItem[] = carts.map((item: CartItem) => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.discountPrice,
  }))
  const totalAmount = carts.reduce((total: number, item: CartItem) => {
    return total + item.discountPrice * item.quantity;
  }, 0);

  const handleSubmit =async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const input: Order = { customer: formData, items: orderItems, totalAmount }
      const res: any = await axios.post("http://localhost:5000/api/orders", input)
      dispatch(clearCart())
      setIsOpen(false)
      alert(res?.data?.message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
          Place Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-popover border-border">
        <DialogHeader>
          <DialogTitle className="text-popover-foreground">Complete Your Order</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please provide your details to complete the purchase.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-popover-foreground mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-background border-border text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-popover-foreground mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-background border-border text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="address" className="text-popover-foreground mb-2 block">
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="bg-background border-border text-foreground"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Confirm Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
