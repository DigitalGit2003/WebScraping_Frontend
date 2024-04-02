import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";

export default function Scraper() {
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  }, []);

  // All in One
  const BASE_URI = "http://127.0.0.1:5050";
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const netmedsScrape = async () => {
    let result = await fetch(`${BASE_URI}/product/netmeds`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (result.status === 401 || result.status === 422) {
      setLoggedIn(false);
      navigate("/login");
    } else if (!result.ok) {
      console.log("Error in fetching data");
      return;
    }

    result = await result.json();
    console.log(result);
  };
  const zeelabScrape = async () => {
    let selectedCategory = document.querySelector("select").value;

    // Pass Access Token as part of the request header to authenticate the user
    let result = await fetch(
      `${BASE_URI}/product/zeelab?category=${selectedCategory}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );

    if (result.status === 401 || result.status === 422) {
      setLoggedIn(false);
      navigate("/login");
    } else if (!result.ok) {
      console.log("Error in fetching data");
      return;
    }

    result = await result.json();
    console.log(result);
  };
  const truemedsScrape = async () => {
    let result = await fetch(`${BASE_URI}/product/truemeds`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (result.status === 401 || result.status === 422) {
      setLoggedIn(false); // Unauthorized user
      navigate("/login");
    } else if (!result.ok) {
      console.log("Error in fetching data");
      return;
    }

    result = await result.json();
    console.log(result);
  };

  const categories = [
    "bone-joints",
    "cold-flu",
    "sugar-care",
    "eye-ear",
    "hair",
    "heart-medicines",
    "mens",
    "multivitamins",
    "nutrition",
    "oral-care",
    "personal",
    "stomach",
    "thyroid",
    "womens",
    "sexual",
    "skinbeauty",
    "acidity",
    "asthma",
  ];

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

      <select>
        <option value="">Select a Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

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
