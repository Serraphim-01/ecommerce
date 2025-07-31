"use client";

import { ProductFormData } from "@/types";

interface DeliveryOptionsSectionProps {
  product: ProductFormData;
  productIndex: number;
  updateDeliveryOption: (
    productIndex: number,
    option: keyof ProductFormData["deliveryOptions"],
    value: boolean
  ) => void;
}

export const DeliveryOptionsSection = ({
  product,
  productIndex,
  updateDeliveryOption,
}: DeliveryOptionsSectionProps) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Delivery Options
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Lagos Delivery
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.deliveryOptions.lagosPickup}
                onChange={(e) =>
                  updateDeliveryOption(
                    productIndex,
                    "lagosPickup",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              <span className="text-sm">Pickup</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.deliveryOptions.lagosDoor}
                onChange={(e) =>
                  updateDeliveryOption(
                    productIndex,
                    "lagosDoor",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              <span className="text-sm">Door Delivery</span>
            </label>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Outside Lagos
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.deliveryOptions.outsidePickup}
                onChange={(e) =>
                  updateDeliveryOption(
                    productIndex,
                    "outsidePickup",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              <span className="text-sm">Pickup</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={product.deliveryOptions.outsideDoor}
                onChange={(e) =>
                  updateDeliveryOption(
                    productIndex,
                    "outsideDoor",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
              <span className="text-sm">Door Delivery</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
