"use client";

import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface ImageUploadSectionProps {
  productIndex: number;
  images: File[];
  onImageDrop: (acceptedFiles: File[], productIndex: number) => void;
  removeImage: (productIndex: number, imageIndex: number) => void;
}

export const ImageUploadSection = ({
  productIndex,
  images,
  onImageDrop,
  removeImage,
}: ImageUploadSectionProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onImageDrop(acceptedFiles, productIndex);
    },
  });

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Product Images
      </label>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600">
          Drag & drop images here, or click to select
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((image, imageIndex) => (
            <div key={imageIndex} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Product ${imageIndex + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(productIndex, imageIndex)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
