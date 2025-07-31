"use client";

import { Plus } from "lucide-react";
import { ProductFormData } from "@/types";

interface AddProductModalActionsProps {
  addProduct: () => void;
  onClose: () => void;
  loading: boolean;
  products: ProductFormData[];
}

export const AddProductModalActions = ({
  addProduct,
  onClose,
  loading,
  products,
}: AddProductModalActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={addProduct}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
      >
        <Plus className="w-4 h-4" />
        <span>Add Another Product</span>
      </button>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            `Add ${products.length} Product${products.length > 1 ? "s" : ""}`
          )}
        </button>
      </div>
    </div>
  );
};
