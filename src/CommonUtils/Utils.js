import { createContext, useState } from "react";

export const Utils = createContext();

const Context = ({ children }) => {
 const [Categoriesid,setCategoriesId] = useState("")
 const [pageNo,setPageeNo] = useState(1)
  return (
    <>
      <Utils.Provider
        value={{
          Categoriesid,
          setCategoriesId,
          pageNo,
          setPageeNo
        }}
      >
        {children}
      </Utils.Provider>
    </>
  );
};

export default Context;
