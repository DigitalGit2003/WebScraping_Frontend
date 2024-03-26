import React from "react";
import { useState, useEffect } from "react";
import Card from "./product/Card";
import Filter from "./product/Filter";

export default function Home() {
  const [data, setData] = useState([]);

  const retData = async () => {
    var response = await fetch(`http://127.0.0.1:5050/product/netmeds`, {
      method: "get",
    });
    response = await response.json();
    console.log(response.results);
    setData(response.results);
  };

  useEffect(() => {
    retData();
  }, []);

  return <Filter products={data} />;
}
