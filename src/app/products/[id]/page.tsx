"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const result = await response.json();
        setProduct(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center  justify-center min-h-screen bg-gray-50 text-gray-700">
        <div className="text-center mt-24">
          <p className="text-2xl font-semibold">Loading...</p>
          <div className="mt-4 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b mt-24 from-blue-50 to-white ">
      {/* Header */}


      {/* Main Content */}
      <main className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-80 h-80 object-contain rounded-md border border-gray-200"
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
            <p className="text-xl font-semibold text-blue-600 mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-gray-800">
              <strong>Rating:</strong>{" "}
              <span className="text-yellow-500 font-bold">{product.rating.rate}</span>{" "}
              <span className="text-gray-600">({product.rating.count} reviews)</span>
            </p>
          </div>
        </div>
      </main>

   
    </div>
  );
};

export default ProductPage;
