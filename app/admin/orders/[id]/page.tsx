"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminOrderDetails } from "../hooks/useAdminOrderDetails";
import { AdminOrderTimeline } from "../components/AdminOrderTimeline";
import { PaymentConfirmation } from "../components/PaymentConfirmation";
import { OrderItems } from "../components/OrderItems";
import { CustomerDetails } from "../components/CustomerDetails";

const AdminOrderDetailPage = () => {
  const { order, loading, error, handleStatusUpdate } = useAdminOrderDetails();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        Order not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/orders"
          className="flex items-center text-blue-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Orders
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order #{order.id.substring(0, 8)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PaymentConfirmation
              order={order}
              handleStatusUpdate={handleStatusUpdate}
            />
            <AdminOrderTimeline
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
            <OrderItems order={order} />
          </div>

          <div className="space-y-8">
            <CustomerDetails order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
