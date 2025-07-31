"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Order } from "@/types";
import { getOrderById, updateOrderStatus } from "@/lib/supabase/orders";

export const useAdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const fetchedOrder = await getOrderById(id as string);
        if (!fetchedOrder) {
          setError("Order not found.");
        } else {
          setOrder(fetchedOrder);
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (newStatus: Order["status"]) => {
    if (!order) return;
    try {
      const updatedOrder = await updateOrderStatus(order.id, newStatus);
      if (!updatedOrder) {
        alert("Order not found or you don’t have permission to update.");
        return;
      }
      setOrder(updatedOrder);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status.");
    }
  };

  return {
    order,
    loading,
    error,
    handleStatusUpdate,
  };
};
