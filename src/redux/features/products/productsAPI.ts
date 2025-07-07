import axios from "axios";
import { Product } from "../../../lib/types";

export async function fetchProductsAPI(): Promise<Product[]> {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const search = urlParams.get("search");
  const category = urlParams.get("category");
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products`,
    {
      params: {
        search: search,
        category: category
      }
    }
  );
  return response.data.data;
}
