import React from "react";

export default function Scraper() {
  // All in One
  const BASE_URI = "http://127.0.0.1:5050";

  const netmedsScrape = async () => {
    let result = await fetch(`${BASE_URI}/product/netmeds`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
   
  };
  const zeelabScrape = async () => {
    let result = await fetch(`${BASE_URI}/product/zeelab`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    
  };
  const truemedsScrape = async () => {
    let result = await fetch(`${BASE_URI}/product/truemeds`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    
    
  };

  return (
    <div>
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        onClick={netmedsScrape}
      >
        Netmeds Scrape
      </button>
      <br />
      <br />
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        onClick={zeelabScrape}
      >
        Zeelab Scrape
      </button>
      <br />
      <br />
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
        onClick={truemedsScrape}
      >
        Truemeds Scrape
      </button>
    </div>
  );
}
