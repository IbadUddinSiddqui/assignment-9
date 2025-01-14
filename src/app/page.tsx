"use client";

import React, { useEffect, useState } from "react";
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

const HomePage = () => {
  const [data, setData] = useState<Product[] | null>(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetch("https://fakestoreapi.com/products");

        if (!result.ok) {
          throw new Error("Failed to fetch products");
        }

        const res = await result.json();
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts.

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
  if (error) {
    return <div className="text-center text-red-500 p-8">Error: {error}</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 mt-16 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to E-Commerce Store</h1>
          <p className="text-lg mb-6">
            Explore the best products at unbeatable prices. Shop now and enjoy fast delivery!
          </p>
          <a
            href="/products"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Displaying only the first 4 products */}
            {data && data.slice(0, 4).map((product: any) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
               <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-contain mb-4 rounded"
              />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-700 mb-4">${product.price}</p>
                  <a
                    href={`/products/${product.id}`}
                    className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-500 transition-colors"
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-700 mb-6">
            Stay updated with the latest offers and trends.
          </p>
          <form className="flex justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
