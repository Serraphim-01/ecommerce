"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ProductFormData } from "@/types";

export const useProductForm = (onProductAdded: () => void, onClose: () => void) => {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductFormData[]>([
    {
      name: "",
      description: "",
      originalPrice: 0,
      discountPercentage: 0,
      category: "Clothing",
      quantity: 0,
      sizes: [""],
      colors: [""],
      images: [],
      deliveryOptions: {
        lagosPickup: false,
        lagosDoor: false,
        outsidePickup: false,
        outsideDoor: false,
      },
    },
  ]);
  const [loading, setLoading] = useState(false);

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        originalPrice: 0,
        discountPercentage: 0,
        category: "Clothing",
        quantity: 0,
        sizes: [""],
        colors: [""],
        images: [],
        deliveryOptions: {
          lagosPickup: false,
          lagosDoor: false,
          outsidePickup: false,
          outsideDoor: false,
        },
      },
    ]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateProduct = (
    index: number,
    field: keyof ProductFormData,
    value: any
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const updateDeliveryOption = (
    productIndex: number,
    option: keyof ProductFormData["deliveryOptions"],
    value: boolean
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? {
              ...product,
              deliveryOptions: { ...product.deliveryOptions, [option]: value },
            }
          : product
      )
    );
  };

  const addArrayItem = (productIndex: number, field: "sizes" | "colors") => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? { ...product, [field]: [...product[field], ""] }
          : product
      )
    );
  };

  const updateArrayItem = (
    productIndex: number,
    field: "sizes" | "colors",
    itemIndex: number,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? {
              ...product,
              [field]: product[field].map((item, j) =>
                j === itemIndex ? value : item
              ),
            }
          : product
      )
    );
  };

  const removeArrayItem = (
    productIndex: number,
    field: "sizes" | "colors",
    itemIndex: number
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? {
              ...product,
              [field]: product[field].filter((_, j) => j !== itemIndex),
            }
          : product
      )
    );
  };

  const onImageDrop = (acceptedFiles: File[], productIndex: number) => {
    setProducts((prev) =>
      prev.map((product, index) =>
        index === productIndex
          ? { ...product, images: [...product.images, ...acceptedFiles] }
          : product
      )
    );
  };

  const removeImage = (productIndex: number, imageIndex: number) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? {
              ...product,
              images: product.images.filter((_, j) => j !== imageIndex),
            }
          : product
      )
    );
  };

  const uploadImages = async (images: File[]): Promise<string[]> => {
    const uploadPromises = images.map(async (image) => {
      const fileName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, image, { upsert: true });

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const product of products) {
        if (
          !product.name ||
          !product.description ||
          product.originalPrice <= 0
        ) {
          toast({
            title: "Validation Error",
            description: "Please fill in all required fields for each product.",
            variant: "destructive",
          });
          return;
        }

        const imageUrls =
          product.images.length > 0 ? await uploadImages(product.images) : [];

        const discountedPrice =
          product.originalPrice * (1 - product.discountPercentage / 100);

        const productData = {
          name: product.name,
          description: product.description,
          price: Math.round(discountedPrice),
          original_price: product.originalPrice,
          category: product.category,
          size: product.sizes.filter((s) => s.trim() !== ""),
          color: product.colors.filter((c) => c.trim() !== ""),
          images: imageUrls,
          in_stock: product.quantity > 0,
          featured: false,
        };

        const { error } = await supabase.from("products").insert(productData);

        if (error) throw error;
      }

      toast({
        title: "Success!",
        description: `${products.length} product(s) added successfully.`,
      });

      onProductAdded();
      onClose();
    } catch (error) {
      console.error("Error adding products:", error);
      toast({
        title: "Error",
        description: "Failed to add products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    addProduct,
    removeProduct,
    updateProduct,
    updateDeliveryOption,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    onImageDrop,
    removeImage,
    handleSubmit,
  };
};
