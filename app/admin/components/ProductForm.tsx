'use client';

import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Plus, Minus, Upload, Trash2 } from 'lucide-react';
import { Product, Category } from '@/types';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

import { ProductVariant } from '@/types';

export interface ProductFormData {
  name: string;
  description:string;
  price: number;
  original_price?: number;
  category: string;
  images: (File | string)[];
  delivery_options: string[];
  variants: ProductVariant[];
}

interface ProductFormProps {
  product: ProductFormData;
  onChange?: (data: ProductFormData) => void;
  onRemove: () => void;
  isSaving: boolean;
  onSubmit?: (data: ProductFormData) => void;
  categories: Category[];
}

const ProductForm = ({
  product,
  onChange,
  onRemove,
  isSaving,
  onSubmit,
  categories,
}: ProductFormProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const formData = product;

  const setFormData = (updater: (prev: ProductFormData) => ProductFormData) => {
    if (onChange) {
      onChange(updater(formData));
    }
  };

  const handleAddNewCategory = async () => {
    if (newCategoryName.trim() === '' || newCategorySlug.trim() === '') {
        // Maybe show a toast error here
        return;
    };
    const { data, error } = await supabase
      .from('categories')
      .insert({
          name: newCategoryName,
          slug: newCategorySlug,
          description: newCategoryDescription,
      })
      .select()
      .single();
    if (error) {
      console.error('Error adding category:', error);
    } else {
      if (onChange) {
        onChange({ ...formData, category: data.name });
      }
      setNewCategoryName('');
      setNewCategorySlug('');
      setNewCategoryDescription('');
      revalidatePath('/products');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...acceptedFiles],
      }));
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const newDeliveryOptions = prev.delivery_options.includes(option)
        ? prev.delivery_options.filter((o) => o !== option)
        : [...prev.delivery_options, option];
      return { ...prev, delivery_options: newDeliveryOptions };
    });
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { id: '', product_id: '', color: '', size: '', quantity: 0 }],
    }));
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const removeImage = (imageIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, j) => j !== imageIndex),
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 relative">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
      >
        <Trash2 className="w-5 h-5" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="space-y-2 p-3 border rounded-md">
            <label className="block text-sm font-medium text-gray-700">Create New Category</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New category name"
            />
            <input
              type="text"
              value={newCategorySlug}
              onChange={(e) => setNewCategorySlug(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New category slug"
            />
            <textarea
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New category description"
              rows={2}
            />
            <button
              type="button"
              onClick={handleAddNewCategory}
              className="w-full mt-2 px-3 py-2 border border-transparent bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Add Category
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₦) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Original Price (₦)</label>
            <input
              type="number"
              name="original_price"
              value={formData.original_price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Variants</label>
        <div className="space-y-4">
          {formData.variants.map((variant, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
              <input
                type="text"
                placeholder="Color (e.g., Red)"
                value={variant.color}
                onChange={(e) => updateVariant(index, 'color', e.target.value)}
                className="col-span-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Size (e.g., M)"
                value={variant.size}
                onChange={(e) => updateVariant(index, 'size', e.target.value)}
                className="col-span-1 border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={variant.quantity}
                onChange={(e) => updateVariant(index, 'quantity', parseInt(e.target.value) || 0)}
                className="col-span-1 border border-gray-300 rounded-md px-3 py-2"
                min="0"
              />
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="col-span-1 text-red-600 hover:text-red-800 flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addVariant}
          className="mt-4 flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Variant</span>
        </button>
      </div>

      {/* Images */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">Drag & drop images here, or click to select</p>
        </div>
        {formData.images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {formData.images.map((image, imageIndex) => (
              <div key={imageIndex} className="relative">
                <img
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt={`Product ${imageIndex + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button type="button" onClick={() => removeImage(imageIndex)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Options */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
        <div className="grid grid-cols-2 gap-4">
          {[
            'Lagos Pickup',
            'Lagos Door Delivery',
            'Outside Lagos Pickup',
            'Outside Lagos Door Delivery',
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.delivery_options.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mr-2"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {onSubmit && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => onSubmit(formData)}
            disabled={isSaving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Product"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductForm;
