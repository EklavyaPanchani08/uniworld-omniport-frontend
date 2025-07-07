import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesStart } from "../redux/features/category/categoriesSlice";
import { fetchProductsStart } from "../redux/features/products/productsSlice";

export default function SearchAndFilter() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [searchParams, setSearchParams] = useSearchParams();

  // GET CATEGORIES
  const dispatch = useDispatch();
  const { items: categories } = useSelector(
    (state: any) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  // SET SEARCH AND CATEGORY FROM URL
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    if (search) {
      setSearch(search);
    }
    if (category) {
      setCategory(categories.find((cat: any) => cat.id === category)?.id);
    }
  }, [searchParams, categories]);

  // REFETCH PRODUCTS
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(fetchProductsStart());
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [search, category, dispatch])

  const handleSearch = (value: string) => {
    setSearch(value);
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set('search', value);
    } else {
      updatedParams.delete('search');
    }
    setSearchParams(updatedParams);
  }

  const handleChangeCategory = (value: string) => {
    if (value === "all") {
      setCategory(value);
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.delete('category');
      setSearchParams(updatedParams);
    } else {
      const updatedParams = new URLSearchParams(searchParams);
      if (value) {
        updatedParams.set('category', value);
        setCategory(value);
      } else {
        updatedParams.delete('category');
        setCategory(value);
      }
      setSearchParams(updatedParams);
    }
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-background border-border transition-colors"
        />
      </div>
      <Select value={category} onValueChange={(value) => handleChangeCategory(value)}>
        <SelectTrigger className="w-full sm:w-48 bg-background border-border transition-colors">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category: any) => (
            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
