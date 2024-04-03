import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { ProductContext } from "../../App";
import ScrapeCard from "./ScrapeCard";

export default function Scraper() {
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  }, []);
  
  const BASE_URI = process.env.REACT_APP_API_URI;

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useContext(ProductContext);
  
  const [isNLoading, setIsNLoading] = useState(false);
  const netmedsScrape = async () => {
    try {
      setIsNLoading(true);
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
        setIsNLoading(false);
        console.log("Error in fetching data");
        return;
      }

      result = await result.json();
      console.log(result.data);
      setIsNLoading(false);

      setData(result.data);
      navigate("/home");
    } catch (e) {
      setIsNLoading(false);
      console.log(e);
    }
  };

  
  const [isZLoading, setIsZLoading] = useState(false);
  const zeelabScrape = async (category) => {
    let selectedCategory = category;

    try {
      setIsZLoading(true);
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
        setIsZLoading(false);
        console.log("Error in fetching data");
        return;
      }

      result = await result.json();

      console.log(result.data);
      setIsZLoading(false);
      setData(result.data);
      navigate("/home");
    } catch (e) {
      setLoggedIn(false);
      console.log(e);
    }
  };

  const [isTLoading, setIsTLoading] = useState(false);
  const truemedsScrape = async () => {
    try {
      setIsTLoading(true);
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
        setIsTLoading(false);
        console.log("Error in fetching data");
        return;
      }

      result = await result.json();
      console.log(result.data);
      setIsTLoading(false);

      setData(result.data);
      navigate("/home");
    } catch (e) {
      setIsTLoading(false);
      console.log(e);
    }
  };

  const zeelab_categories = [
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

  const netmeds_categories = [];

  const truemeds_categories = [];

  return (
    <div className="flex flex-wrap">
      <ScrapeCard
        web={"Netmeds"}
        link={"https://www.netmeds.com/"}
        category={netmeds_categories}
        onScrape={netmedsScrape}
        loader={isNLoading}
      />

      <ScrapeCard
        web={"Zeelab"}
        link={"https://zeelabpharmacy.com/"}
        category={zeelab_categories}
        onScrape={zeelabScrape}
        loader={isZLoading}
      />

      <ScrapeCard
        web={"Truemeds"}
        link={"https://www.truemeds.in/"}
        category={truemeds_categories}
        onScrape={truemedsScrape}
        loader={isTLoading}
      />
    </div>
  );
}
