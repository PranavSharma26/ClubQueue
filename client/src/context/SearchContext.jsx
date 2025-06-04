import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const updateSearch = (s) => {
    setSearch(s);
  };
  return (
    <SearchContext.Provider value={{ search, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchAuth = () => useContext(SearchContext);