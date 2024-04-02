import React, { useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Card from "./Card";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const PER_PAGE = 4;

export default function Filter(props) {
  const [searchedData, setSearchedData] = useState([]);

  const [products, setProducts] = useState(props.products); // Manage products with useState

  const BASE_URL = "http://127.0.0.1:5050";

  useEffect(() => {
    // Update products when props.products change
    setProducts(props.products);
  }, [props.products]);
  // Pagination ++++++++++++++++++++++++++++++++

  const [currentPage, setCurrentPage] = useState(0);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = products
    .slice(offset, offset + PER_PAGE)
    .map((product) => <Card key={product.id} product={product} />);

  const pageCount = Math.ceil(products.length / PER_PAGE);

  // +++++++++++++++++++++++++++++

  let allProducts = [];

  const searchByName = async () => {
    const name = document.getElementById("search_by_name").value;

    // Search in netmeds
    var response = await fetch(`${BASE_URL}/product/netmeds?name=${name}`, {
      method: "get",
    });

    response = await response.json();

    allProducts = response.results;

    // Search in zeelab
    response = await fetch(`${BASE_URL}/product/zeelab?name=${name}`, {
      method: "get",
    });

    response = await response.json();

    allProducts = allProducts.concat(response.results);

    // Search in truemeds
    response = await fetch(`${BASE_URL}/product/truemeds?name=${name}`, {
      method: "get",
    });

    response = await response.json();

    allProducts = allProducts.concat(response.results);

    setProducts(allProducts); // Update products state here

    console.log(allProducts);
  };

  const searchByContent = async () => {
    const info = document.getElementById("search_by_content").value;

    var response = await fetch(`${BASE_URL}/product/zeelab?q=${info}`, {
      method: "get",
    });

    response = await response.json();
    setProducts(response.results); // Update products state here
    console.log(response.results);
  };

  const searchByPrice = async () => {
    const min_price = document.getElementById("search_by_min_price").value;
    const max_price = document.getElementById("search_by_max_price").value;

    var response = await fetch(
      `http://127.0.0.1:5050/product/netmeds?min_price=${min_price}&max_price=${max_price}`,
      {
        method: "get",
      }
    );

    response = await response.json();
    setProducts(response.results); // Update products state here

    console.log(response.results);
  };

  const searchByImage = async () => {
    const file = document.getElementById("search_by_image");
    const img = file.files[0];

    const formData = new FormData();
    formData.append("image", img);

    var response = await fetch(`http://127.0.0.1:5050/uploader`, {
      method: "post",
      body: formData,
    });

    response = await response.json();
    setProducts(response.results); // Update products state here
    console.log(response.results);
  };

  return (
    <div className="mx-5 max-w-10xl px-2 py-3">
      {/* Top */}
      <div className="md:flex md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-bold">Products</h1>
        </div>
        <div className="mt-6 flex items-center  pt-2 md:mt-0 md:space-x-4  md:pt-0">
          <button
            type="button"
            className="hidden items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex"
          >
            Sort <ChevronDown className="ml-2 h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Name <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Content <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
          >
            Price <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
      <hr className="my-8" />
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
        <div className="hidden space-y-6 divide-y lg:col-span-3 lg:block">
          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search By Product Name
            </h3>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Name of the product"
              id="search_by_name"
            ></input>{" "}
            <br />
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={searchByName}
            >
              Search
            </button>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search By Product Content
            </h3>
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="content of the product"
              id="search_by_content"
            ></input>{" "}
            <br />
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={searchByContent}
            >
              Search
            </button>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search By Product Price
            </h3>
            <div className="flex">
              <input
                type="number"
                className="flex w-20 h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mr-1"
                placeholder="min"
                step="10"
                min="10"
                max="10000"
                id="search_by_min_price"
              ></input>
              <input
                type="number"
                className="flex w-20 h-10 rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ml-1 mr-1"
                placeholder="max"
                step="10"
                min="10"
                max="10000"
                id="search_by_max_price"
              ></input>

              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ml-1"
                onClick={searchByPrice}
              >
                Search
              </button>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Search By Product Image
            </h3>
            <input
              type="file"
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Image"
              id="search_by_image"
            ></input>{" "}
            <br />
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={searchByImage}
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex h-[400px] w-full rounded-lg border-2 border-dashed px-2 lg:col-span-9 lg:h-full">
          {currentPageData}
        </div>

        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}
