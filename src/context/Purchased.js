import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { createOrder, getOrders } from "../api";
import { useUser } from "./user";

const PurchasedContext = createContext();

export function PurchasedProvider({ children }) {
  const { user, isLoadingUser } = useUser();
  const [purchases, setPurchases] = useState([]);
  const [isPurchasesLoading, setIsPurchasesLoading] = useState(false);

  const formatOrders = useCallback((orders) => {
    return (orders || []).map((order) => ({
      id: order._id,
      time: order.createdAt,
      total: order.total,
      status: order.status,
      items: (order.items || [])
        .filter((item) => item.product)
        .map((item) => ({
          ...item.product,
          productId: item.product._id,
          quantity: item.quantity,
          price: item.price
        }))
    }));
  }, []);

  const loadPurchases = useCallback(async () => {
    if (!user) {
      setPurchases([]);
      return [];
    }

    setIsPurchasesLoading(true);

    try {
      const response = await getOrders();
      const formattedOrders = formatOrders(response.data.data);
      setPurchases(formattedOrders);
      return formattedOrders;
    } finally {
      setIsPurchasesLoading(false);
    }
  }, [user, formatOrders]);

  useEffect(() => {
    if (isLoadingUser) return;

    if (!user) {
      setPurchases([]);
      return;
    }

    loadPurchases();
  }, [user, isLoadingUser, loadPurchases]);

  const purchaseItems = async (items) => {
    const orderItems = items?.map((item) => ({
      productId: item._id || item.productId || item.id,
      quantity: item.quantity || 1
    }));
    const response = await createOrder(orderItems);
    const order = formatOrders([response.data.data])[0];

    setPurchases((prev) => [
      order,
      ...prev.filter((existingPurchase) => existingPurchase.id !== order.id),
    ]);

    return order;
  };

  return (
    <PurchasedContext.Provider
      value={{
        purchases,
        purchaseItems,
        loadPurchases,
        isPurchasesLoading,
      }}
    >
      {children}
    </PurchasedContext.Provider>
  );
}

export default PurchasedContext;
export const usePurchased = () => useContext(PurchasedContext);
