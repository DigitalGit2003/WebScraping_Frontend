import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Card from "./product/Card";
import Filter from "./product/Filter";
import { ProductContext } from "../App";

export default function Home() {
  const BASE_URI = process.env.REACT_APP_API_URI;
  // const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useContext(ProductContext);

  const retData = async () => {
    let allProducts = [];

    try {
      setIsLoading(true);
      //
      var response = await fetch(`${BASE_URI}/product/truemeds`, {
        method: "get",
      });
      response = await response.json();

      allProducts = response.results;

      //
      var response = await fetch(`${BASE_URI}/product/netmeds`, {
        method: "get",
      });
      response = await response.json();

      allProducts = allProducts.concat(response.results);

      //
      var response = await fetch(`${BASE_URI}/product/zeelab`, {
        method: "get",
      });
      response = await response.json();

      allProducts = allProducts.concat(response.results);

      // Shuffle the allProducts array randomly using inbuilt function
      allProducts.sort(() => Math.random() - 0.5);
      for (let i = allProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
      }

      setIsLoading(false);
      setData(allProducts);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retData();
  }, []);

  return <Filter products={data} loader={isLoading}/>;
}
