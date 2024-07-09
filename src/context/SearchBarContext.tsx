import { createContext, useState } from "react";
interface IContextSearchBar {
  search: string;
  setSearch: (value: string) => void;
}

export const ContextSerchBar = createContext<IContextSearchBar>({
  search: "",
  setSearch: () => {},
});

export default function SearchBarProvider({ children }) {
  const [search, setSearch] = useState<string>("");

  return (
    <ContextSerchBar.Provider value={{ search, setSearch }}>
      {children}
    </ContextSerchBar.Provider>
  );
}
