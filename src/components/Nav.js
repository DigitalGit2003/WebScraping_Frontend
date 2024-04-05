"use client";

import React, { useEffect } from "react";
import { useContext } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { LoginContext } from "../App";
import { NavLink } from "react-router-dom";

export default function Nav() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold"> WebScraper</span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <NavLink
            to={"/home"}
            activeClassName="text-gray-900"
            className="-m-0.5 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-100"
          >
            <span className="ml-3 text-base font-medium text-gray-900">
              Home
            </span>
            <span>
              <ChevronRight className="ml-3 h-4 w-4" />
            </span>
          </NavLink>

          {loggedIn && (
            <NavLink
              to={"/scraper"}
              activeClassName="text-gray-900"
              className="-m-0.5 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-100"
            >
              <span className="ml-3 text-base font-medium text-gray-900">
                Scraper
              </span>
              <span>
                <ChevronRight className="ml-3 h-4 w-4" />
              </span>
            </NavLink>
          )}
        </div>
        <div className="hidden space-x-2 lg:block">
          <button
            type="button"
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </button>

          {loggedIn ? (
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => {
                setLoggedIn(false);
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => (window.location.href = "/login")}
            >
              Log In
            </button>
          )}
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <h1> Logo </h1>
                    </span>
                    <span className="font-bold">Web</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    <NavLink
                      to={"/home"}
                      activeClassName="text-gray-900"
                      className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        Home
                      </span>
                      <span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </span>
                    </NavLink>

                    {loggedIn && (
                      <NavLink
                        to={"/scraper"}
                        activeClassName="text-gray-900"
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Scraper
                        </span>
                        <span>
                          <ChevronRight className="ml-3 h-4 w-4" />
                        </span>
                      </NavLink>
                    )}
                  </nav>
                </div>
                <div className="mt-2 space-y-2">
                  <button
                    type="button"
                    className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => (window.location.href = "/register")}
                  >
                    Register
                  </button>

                  {loggedIn ? (
                    <button
                      type="button"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => {
                        setLoggedIn(false);
                        window.location.href = "/login";
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      onClick={() => (window.location.href = "/login")}
                    >
                      Log In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
