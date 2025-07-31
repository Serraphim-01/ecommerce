"use client";

import { Order } from "@/types";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface PaymentConfirmationProps {
  order: Order;
  handleStatusUpdate: (status: Order["status"]) => void;
}

export const PaymentConfirmation = ({
  order,
  handleStatusUpdate,
}: PaymentConfirmationProps) => {
  const confirmPayment = () => handleStatusUpdate("paid");
  const rejectPayment = () => handleStatusUpdate("pending");

  if (order.status !== "payment_review") {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
        Confirm Payment
      </h3>
      {order.payment_receipt ? (
        <div>
          <p className="mb-4">
            A payment receipt has been uploaded. Please review it and
            confirm the payment.
          </p>
          <a
            href={order.payment_receipt}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold mb-6 block"
          >
            View Payment Receipt
          </a>
          <img
            src={order.payment_receipt}
            alt="Payment Receipt"
            className="max-w-full h-auto rounded-md border"
          />
          <div className="mt-6 flex space-x-4">
            <button
              onClick={confirmPayment}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Approve Payment
            </button>
            <button
              onClick={rejectPayment}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
            >
              <XCircle className="w-5 h-5 mr-2" />
              Reject Payment
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">
          No payment receipt was uploaded for this order.
        </p>
      )}
    </div>
  );
};
