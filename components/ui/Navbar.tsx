"use client";

import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import Searchbar from "./Searchbar";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Research", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className="bg-white dark:bg-dark-bg shadow-sm data-[open]:fixed data-[open]:inset-0 data-[open]:z-40 data-[open]:overflow-y-auto lg:static lg:overflow-y-visible data-[open]:lg:static data-[open]:lg:overflow-y-visible"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-between lg:gap-8">
            <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
              <div className="flex flex-shrink-0 items-center">
                <a href="#" className="flex flex-row gap-4 items-center">
                  <Logo className="h-8 w-auto dark:text-white" />
                  <p className="hidden lg:block font-semibold">
                    <span className="text-rose-600">Rent</span> Monster
                  </p>
                </a>
              </div>
            </div>

            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-rose-500 px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Home
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                Research
              </a>
              <a
                href="#"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                About Us
              </a>
            </div>

            <div className="min-w-0 flex-1 md:px-8 lg:px-4 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <Searchbar />
              </div>
            </div>
            <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
              {/* Mobile menu button */}
              <PopoverButton className="group relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </PopoverButton>
            </div>
            <div
              className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4"
              suppressHydrationWarning
            >
              {theme === "dark" ? (
                <SunIcon
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                  onClick={() => setTheme("light")}
                />
              ) : (
                <MoonIcon
                  className="w-6 h-6 text-gray-500 dark:text-gray-400"
                  onClick={() => setTheme("dark")}
                />
              )}
              {/* Profile dropdown */}
              <button
                type="button"
                className="rounded-md bg-rose-600 ml-4 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              >
                Log In
              </button>
              {/* <Menu as="div" className="relative ml-5 flex-shrink-0">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="" src={user.imageUrl} className="h-8 w-8 rounded-full" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <a href={item.href} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 data-[focus]:bg-gray-100 dark:data-[focus]:bg-gray-700">
                                                {item.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </MenuItems>

                            </Menu> */}
            </div>
          </div>
        </div>

        <PopoverPanel as="nav" aria-label="Global" className="lg:hidden">
          <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
            {/* <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                            <div className="flex-shrink-0">
                                <img alt="" src={user.imageUrl} className="h-10 w-10 rounded-full" />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800 dark:text-white">{user.name}</div>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                            </div>

                        </div> */}
            <div className="mx-auto mt-0 max-w-3xl space-y-1 px-2 sm:px-4">
              <a
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                Sign In
              </a>
              {/* {userNavigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                >
                                    {item.name}
                                </a>
                            ))} */}
              {theme === "dark" ? (
                <SunIcon
                  className="block rounded-md ml-3 w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setTheme("light")}
                />
              ) : (
                <MoonIcon
                  className="block rounded-md ml-3 w-8 h-8 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setTheme("dark")}
                />
              )}
            </div>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
