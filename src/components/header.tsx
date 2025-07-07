

import { Menu, ShoppingCart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { CartItem, Category } from "../lib/types"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useEffect } from "react"
import { fetchCategoriesStart } from "../redux/features/category/categoriesSlice"

export default function Header() {
  const { cart, categories } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  const itemCount = cart.items.reduce((total: number, item: CartItem) => {
    return total + item.quantity;
  }, 0);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">PT</span>
            </div>
            <span className="font-bold text-xl">Poker Table</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.items.map((item: Category) => (
              <a
                key={item.name}
                href={`/?category=${item.id}`}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a href="/cart">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </a>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  {categories.items.map((item: Category) => (
                    <a
                      key={item.name}
                      href={`/?category=${item.id}`}
                      className="text-sm font-medium transition-colors hover:text-emerald-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
