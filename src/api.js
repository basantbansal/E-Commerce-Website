import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
});

let cachedProducts = null;

const fetchItems = async () => {
  if (cachedProducts) return cachedProducts;

  const response = await api.get("/products");
  cachedProducts = response.data;
  return cachedProducts;
};

export async function fetchItemById(id) {
  const items = await fetchItems();
  return items.find(item => item.id === Number(id));
}

export default fetchItems;