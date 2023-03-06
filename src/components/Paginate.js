import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";
import { useEffect } from "react";

const Paginte = ({pages})=>{

  const {setPageNo,pageNo,disalbledNext} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([1])
   const arr = []
   
   console.log(disalbledNext)
  const NextPAge=()=>{
    const arr = PaginationArrya
   
    arr[0] = pageNo+1
    setPaginationArrya(arr)
    setPageNo(pageNo+1)
    
  }

  let i=0
  const increasePages=()=>{
    if(i<=pages){
      arr=[]
      for(j=i;j<i+5;j++){
        arr.push(j+1)
      }
      i=i+5
    }
    else{
      if(arr[arr.length-1]<pages){
        diff = pages%5
        arr=[]
        for(j=i+1;j<diff;j++){
          arr.push(j)
        }
        const button = document.getElementById("next")
        button.setAttribute("disabled","")
      }
      else{
        const button = document.getElementById("next")
        button.setAttribute("disabled","")
      }
    }
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