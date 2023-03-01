import { createContext, useState } from "react";

export const Utils = createContext();

const Context = ({ children }) => {
 const [Categoriesid,setCategoriesId] = useState("")

  return (
    <>
      <Utils.Provider
        value={{
          Categoriesid,
          setCategoriesId
        }}
      >
        {children}
      </Utils.Provider>
    </>
  );
};

export default Context;
