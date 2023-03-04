import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";
import { useEffect } from "react";

const Paginte = ()=>{

  const {setPageNo,pageNo,disalbledNext} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([1])
 
   console.log(disalbledNext)
  const NextPAge=()=>{
    const arr = PaginationArrya
   
    arr[0] = pageNo+1
    setPaginationArrya(arr)
    setPageNo(pageNo+1)
    
  }

   
  const PreviousPAge = ()=>{
    const arr = PaginationArrya 
       if(pageNo>1){
        arr[0] = pageNo-1
        setPaginationArrya(arr)  
        setPageNo(pageNo-1)
       }    
  }


   useEffect(()=>{
    console.log(disalbledNext)
       if(!disalbledNext){
        const button = document.getElementById("next")
        button.setAttribute("disabled","")
       }
       else{
        const button = document.getElementById("next")
        button.disabled = false
       }

   },[disalbledNext])

    return(
        <>
        <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item">
      <span class="page-link" onClick={PreviousPAge}>Previous</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">{PaginationArrya[0]}</a></li>
    <button class="page-link" id="next" onClick={NextPAge}>Next</button>
  </ul>
</nav>  
        </>
    )
}

export default Paginte;