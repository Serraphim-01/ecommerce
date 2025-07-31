"use client";

import { Order } from "@/types";
import {
  CheckCircle,
  Clock,
} from "lucide-react";

interface AdminOrderTimelineProps {
  order: Order;
  onStatusUpdate: (status: Order["status"]) => void;
}

export const AdminOrderTimeline = ({
  order,
  onStatusUpdate,
}: AdminOrderTimelineProps) => {
  const steps = [
    { id: "pending", title: "Pending" },
    { id: "payment_review", title: "Payment Review" },
    { id: "paid", title: "Payment Confirmed" },
    { id: "preparing", title: "Preparing Order" },
    { id: "ready_for_delivery", title: "Ready for Delivery" },
    { id: "shipped", title: "Shipped" },
    { id: "delivered", title: "Delivered" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === order.status);

  const handleUpdate = (newStatus: Order["status"]) => {
    if (
      window.confirm(
        `Are you sure you want to update the status to "${newStatus.replace(
          "_",
          " "
        )}"?`
      )
    ) {
      onStatusUpdate(newStatus);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500"
                      : isCurrent
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="text-white w-5 h-5" />
                  ) : (
                    <Clock className="text-white w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-12 mt-1 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
              <div className="pt-1">
                <p
                  className={`font-semibold ${
                    isCurrent
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-gray-800"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                {isCurrent && (
                  <div className="mt-2 space-x-2">
                    {index < steps.length - 1 && (
                      <button
                        onClick={() =>
                          handleUpdate(steps[index + 1].id as Order["status"])
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                      >
                        Advance to: {steps[index + 1].title}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
