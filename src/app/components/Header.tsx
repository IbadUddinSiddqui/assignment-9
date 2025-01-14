import React from "react";

function Header() {
  return (
    <>
      <header className="bg-blue-600 fixed top-0 left-0 w-full text-white p-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-Commerce Store</h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:underline">
                  Products
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="h-16"></div> {/* Spacer to prevent content overlap */}
    </>
  );
}

export default Header;
