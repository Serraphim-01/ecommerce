"use client";

import { ProductFormData } from "@/types";
import { Plus, Minus } from "lucide-react";

interface AttributeSectionProps {
  product: ProductFormData;
  productIndex: number;
  addArrayItem: (productIndex: number, field: "sizes" | "colors") => void;
  updateArrayItem: (
    productIndex: number,
    field: "sizes" | "colors",
    itemIndex: number,
    value: string
  ) => void;
  removeArrayItem: (
    productIndex: number,
    field: "sizes" | "colors",
    itemIndex: number
  ) => void;
}

export const AttributeSection = ({
  product,
  productIndex,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
}: AttributeSectionProps) => {
  return (
    <>
      {/* Sizes */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Sizes
        </label>
        <div className="space-y-2">
          {product.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="flex items-center space-x-2">
              <input
                type="text"
                value={size}
                onChange={(e) =>
                  updateArrayItem(
                    productIndex,
                    "sizes",
                    sizeIndex,
                    e.target.value
                  )
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., S, M, L, XL"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(productIndex, "sizes", sizeIndex)}
                className="text-red-600 hover:text-red-800"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(productIndex, "sizes")}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" />
            <span>Add Size</span>
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="mt-6">
        <label className="block text-sm font--medium text-gray-700 mb-2">
          Available Colors
        </label>
        <div className="space-y-2">
          {product.colors.map((color, colorIndex) => (
            <div key={colorIndex} className="flex items-center space-x-2">
              <input
                type="text"
                value={color}
                onChange={(e) =>
                  updateArrayItem(
                    productIndex,
                    "colors",
                    colorIndex,
                    e.target.value
                  )
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Red, Blue, Black"
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayItem(productIndex, "colors", colorIndex)
                }
                className="text-red-600 hover:text-red-800"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem(productIndex, "colors")}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" />
            <span>Add Color</span>
          </button>
        </div>
      </div>
    </>
  );
};
