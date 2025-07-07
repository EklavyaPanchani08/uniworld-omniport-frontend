import axios from "axios";
import { Category } from "../../../lib/types";

export async function fetchCategoriesAPI(): Promise<Category[]> {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
  return response.data.data;
}
