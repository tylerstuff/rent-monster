"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";

type Condo = {
  id: string;
  name: string;
  street_name: string;
};

// Utility function to convert text to camel case
const toCamelCase = (text: string) => {
  return text
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};

export default function Searchbar() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Array<Condo>>([]);
  const supabase = createClient();

  const fetchSuggestions = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length > 2) {
        const { data, error } = await supabase
          .from("condos") // Replace with your table name
          .select("name, street_name, id") // Adjust the columns as needed
          .textSearch("name", `%${searchQuery}%`, {
            type: "phrase",
            config: "english",
          });

        if (!error && data) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    },
    [supabase],
  );

  useEffect(() => {
    const debouncedFetchSuggestions = debounce(fetchSuggestions, 500);
    if (query.length > 2) {
      debouncedFetchSuggestions(query);
    } else {
      setSuggestions([]); // Clear suggestions if query is too short
    }

    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [query, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="h-5 w-5 text-gray-400"
          />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          onChange={handleChange}
          value={query}
          placeholder="Search Condo"
          className="block w-full rounded-md border-0 bg-white dark:bg-zinc-900 dark:text-white py-1.5 pl-10 pr-3 text-gray-00 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <div className="flex items-center">
                  <div className="ml-3 block truncate">
                    <span className="font-medium">
                      {toCamelCase(suggestion.name)}
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {toCamelCase(suggestion.street_name)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
