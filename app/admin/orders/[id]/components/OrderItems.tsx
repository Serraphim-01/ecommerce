"use client";

import { Order } from "@/types";

interface OrderItemsProps {
  order: Order;
}

export const OrderItems = ({ order }: OrderItemsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Order Items</h3>
      <ul className="divide-y divide-gray-200">
        {order.items.map((item, index) => (
          <li key={index} className="py-4 flex">
            <div className="ml-4 flex-1 flex flex-col">
              <h4 className="font-semibold">{item.product.name}</h4>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
              <p className="text-sm text-gray-500">
                Size: {item.size}, Color: {item.color}
              </p>
            </div>
            <p className="font-semibold">
              ₦{(item.product.price * item.quantity).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t text-right">
        <p className="text-lg font-bold">
          Total: ₦{order.total_amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
