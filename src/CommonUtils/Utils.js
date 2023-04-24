import { createContext, useState } from "react";


export const Utils = createContext();

const Context = ({ children }) => {
 const [Categoriesid,setCategoriesId] = useState("")
 const [disalbledNext,setDisabledNext] = useState(true)
 const [pageNo,setPageNo] = useState(1)
 const [Selectedcoordinates,setSelectedCoordinates] = useState({
  lat: null, 
  lng: null
})
const [location, setLocation] = useState("");
const [userEmail,setUserEmail] = useState("")
const [password,setPassword] = useState("")
const [pageView,setPageView]  = useState(0)
const [updatedAtt, setUPdatedAtt] = useState([]);
 
  return (
    <>
      <Utils.Provider
        value={{
          Categoriesid,
          setCategoriesId,
          pageNo,
          setPageNo,
          disalbledNext,
          setDisabledNext,
          Selectedcoordinates,
          setSelectedCoordinates,
          location, 
          setLocation,
          userEmail,
          setUserEmail,
          password,
          setPassword,
          pageView,
          setPageView,
          updatedAtt, 
          setUPdatedAtt
        }}
      >
        {children}
      </Utils.Provider>
    </>
  );
};

export default Context;
