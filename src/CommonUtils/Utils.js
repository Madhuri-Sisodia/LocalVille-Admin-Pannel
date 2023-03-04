import { createContext, useState } from "react";

export const Utils = createContext();

const Context = ({ children }) => {
 const [Categoriesid,setCategoriesId] = useState("")
 const [disalbledNext,setDisabledNext] = useState(true)
 const [pageNo,setPageNo] = useState(1)
 
  return (
    <>
      <Utils.Provider
        value={{
          Categoriesid,
          setCategoriesId,
          pageNo,
          setPageNo,
          disalbledNext,
          setDisabledNext
        }}
      >
        {children}
      </Utils.Provider>
    </>
  );
};

export default Context;
