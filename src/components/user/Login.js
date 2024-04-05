import React from "react";
import { useContext, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";

export default function Login() {
  useEffect(() => {
    if (loggedIn === true) {
      navigate("/scraper");
    }
  }, []);

  const BASE_URI = process.env.REACT_APP_API_URI;

  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [loading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  const storeData = async () => {
    setIsError("");

    if (!formData["email"] || !formData["password"]) {
      setIsError("");
      return;
    }

    try {
      setIsLoading(true);
      let result = await fetch(`${BASE_URI}/auth/login`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        console.log(result);

        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);

        setLoggedIn(true);

        navigate("/scraper");
      } else {
        result = await result.json();
        let msg = "";
        msg += result.message;

        setIsError(result.message);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setIsError("Something Went Wrong");
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </a>
            </p>
            <span className="text-red-500">{isError}</span>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  {!formData["email"] && (
                    <span className="text-red-500"> * </span>
                  )}
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  {!formData["password"] && (
                    <span className="text-red-500"> * </span>
                  )}

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={storeData}
                  >
                    {loading ? (
                      "Loading........."
                    ) : (
                      <>
                        {" "}
                        Login <ArrowRight className="ml-2" size={16} />{" "}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4 space-y-3">
              <center>
                {" "}
                <span className="text-red-500">
                  <b>*</b>
                </span>{" "}
                <b>indicates required field</b>
              </center>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
