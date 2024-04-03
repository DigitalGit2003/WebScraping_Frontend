import React, { useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function ScrapeCard(props) {
  const categories = props.category;

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="w-[300px] rounded-md  border-black border-2 m-4">
      <div className="p-4">
        <h1 className="font-semibold text-blue-700">{props.web}</h1>
        <a href={props.link} target="_blank">
          <h1 className="inline-flex items-center text-lg font-semibold">
            Visite Website &nbsp; <ArrowUpRight className="h-4 w-4" />
          </h1>
        </a>
        <p className="mt-3 text-sm text-gray-600">
          Select a category to scrape data from the website.
        </p>

        <div className="flex m-1">
          <option value="">Select a Category</option>

          <select
            className="mx-2 border-2 rounded-md bg-black text-white"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() =>
            props.onScrape(selectedCategory ? selectedCategory : "")
          }
          className="flex justify-center mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {props.loader ? (
            "Loading...."
          ) : (
            <>
              {" "}
              Scrape Data {"  "}
              <ArrowDown className="h-5 w-10 ml-3" />{" "}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
