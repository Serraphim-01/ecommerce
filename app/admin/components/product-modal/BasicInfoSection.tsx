"use client";

import { ProductFormData } from "@/types";

interface BasicInfoSectionProps {
  product: ProductFormData;
  productIndex: number;
  updateProduct: (
    productIndex: number,
    field: keyof ProductFormData,
    value: any
  ) => void;
}

export const BasicInfoSection = ({
  product,
  productIndex,
  updateProduct,
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name *
        </label>
        <input
          type="text"
          value={product.name}
          onChange={(e) =>
            updateProduct(productIndex, "name", e.target.value)
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          value={product.description}
          onChange={(e) =>
            updateProduct(productIndex, "description", e.target.value)
          }
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={product.category}
          onChange={(e) =>
            updateProduct(productIndex, "category", e.target.value)
          }
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
          <option value="Footwear">Footwear</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
    </div>
  );
};
