"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


interface Products {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductsPage = () => {
  const [data, setData] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      }  finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 text-gray-700 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold">Loading...</p>
          <div className="mt-4 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

 

  return (
    <div className="bg-gradient-to-b mt-24 from-blue-50 to-white text-gray-800 p-8">
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-12">
        E-Commerce Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-4 rounded"
              />
              <h2 className="text-lg font-semibold truncate mb-2 text-gray-800 hover:text-blue-500 transition-colors">
                {product.title}
              </h2>
              <p className="text-lg font-medium text-blue-600">${product.price}</p>
              <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-colors">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
