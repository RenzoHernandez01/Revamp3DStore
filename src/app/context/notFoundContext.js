import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext();

export function NotFoundProvider({ children }) {
  const [itemNotFound, setItemNotFound] = useState(null);
  return (
    <NotFoundContext.Provider value={{ itemNotFound, setItemNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  return useContext(NotFoundContext);
}