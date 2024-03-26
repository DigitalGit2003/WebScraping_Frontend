import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Card(item) {
  item = item.product;
  
  return (
    <div className="w-[300px] rounded-md border">
      <img
        src={item.image_url} // Imagelink
        alt={item.title} // Name
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {item.title} {/* Name */}
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          Price: {item.price} {/* Price */}
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <a
            href={item.product_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Product Link
          </a>
        </button>
      </div>
    </div>
  );
}
