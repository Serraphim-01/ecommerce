"use client";

import { Order } from "@/types";

interface CustomerDetailsProps {
  order: Order;
}

export const CustomerDetails = ({ order }: CustomerDetailsProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Customer Details</h3>
      <p>
        <strong>Name:</strong> {order.customer_name}
      </p>
      <p>
        <strong>Email:</strong> {order.customer_email}
      </p>
      <p>
        <strong>Phone:</strong> {order.customer_phone}
      </p>
      <h4 className="font-bold mt-4">Shipping Address</h4>
      <p>{order.shipping_address}</p>
      <p>
        {order.city}, {order.state}
      </p>
    </div>
  );
};
