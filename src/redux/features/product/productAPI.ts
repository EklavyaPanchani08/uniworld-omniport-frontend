import axios from "axios";
import { Product } from "../../../lib/types";

export async function fetchProductAPI(): Promise<Product> {
  const pathSegments = window.location.pathname.split("/");
  const productId = pathSegments[2]; 
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/product/${productId}`
  );
  return response.data.data;
}
