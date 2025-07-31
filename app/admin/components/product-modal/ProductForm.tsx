"use client";

import { ProductFormData } from "@/types";
import { BasicInfoSection } from "./BasicInfoSection";
import { PricingSection } from "./PricingSection";
import { AttributeSection } from "./AttributeSection";
import { ImageUploadSection } from "./ImageUploadSection";
import { DeliveryOptionsSection } from "./DeliveryOptionsSection";
import { Trash2 } from "lucide-react";

interface ProductFormProps {
  product: ProductFormData;
  productIndex: number;
  productsLength: number;
  updateProduct: (
    productIndex: number,
    field: keyof ProductFormData,
    value: any
  ) => void;
  removeProduct: (index: number) => void;
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
  onImageDrop: (acceptedFiles: File[], productIndex: number) => void;
  removeImage: (productIndex: number, imageIndex: number) => void;
  updateDeliveryOption: (
    productIndex: number,
    option: keyof ProductFormData["deliveryOptions"],
    value: boolean
  ) => void;
}

export const ProductForm = ({
  product,
  productIndex,
  productsLength,
  updateProduct,
  removeProduct,
  addArrayItem,
  updateArrayItem,
  removeArrayItem,
  onImageDrop,
  removeImage,
  updateDeliveryOption,
}: ProductFormProps) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-6"
      data-product-index={productIndex}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-md font-medium text-gray-900">
          Product {productIndex + 1}
        </h4>
        {productsLength > 1 && (
          <button
            type="button"
            onClick={() => removeProduct(productIndex)}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfoSection
          product={product}
          productIndex={productIndex}
          updateProduct={updateProduct}
        />
        <PricingSection
          product={product}
          productIndex={productIndex}
          updateProduct={updateProduct}
        />
      </div>

      <AttributeSection
        product={product}
        productIndex={productIndex}
        addArrayItem={addArrayItem}
        updateArrayItem={updateArrayItem}
        removeArrayItem={removeArrayItem}
      />

      <ImageUploadSection
        productIndex={productIndex}
        images={product.images}
        onImageDrop={onImageDrop}
        removeImage={removeImage}
      />

      <DeliveryOptionsSection
        product={product}
        productIndex={productIndex}
        updateDeliveryOption={updateDeliveryOption}
      />
    </div>
  );
};
