"use client";

import { ProductFormData } from "@/types";

interface PricingSectionProps {
  product: ProductFormData;
  productIndex: number;
  updateProduct: (
    productIndex: number,
    field: keyof ProductFormData,
    value: any
  ) => void;
}

export const PricingSection = ({
  product,
  productIndex,
  updateProduct,
}: PricingSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Original Price (₦) *
        </label>
        <input
          type="number"
          value={product.originalPrice}
          onChange={(e) =>
            updateProduct(
              productIndex,
              "originalPrice",
              parseFloat(e.target.value) || 0
            )
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          min="0"
          step="0.01"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Discount Percentage (%)
        </label>
        <input
          type="number"
          value={product.discountPercentage}
          onChange={(e) =>
            updateProduct(
              productIndex,
              "discountPercentage",
              parseFloat(e.target.value) || 0
            )
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          max="100"
          step="0.01"
        />
        {product.discountPercentage > 0 && (
          <p className="mt-1 text-sm text-green-600">
            Sale Price: ₦
            {(
              product.originalPrice *
              (1 - product.discountPercentage / 100)
            ).toFixed(2)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          value={product.quantity}
          onChange={(e) =>
            updateProduct(
              productIndex,
              "quantity",
              parseInt(e.target.value) || 0
            )
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
        />
      </div>
    </div>
  );
};
