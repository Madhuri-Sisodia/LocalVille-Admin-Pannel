import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";
import { useEffect } from "react";

const Paginte = ({pages})=>{
console.log("pages=>",pages)
  const {setPageNo,pageNo,disalbledNext,setPageView} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([])
  const [finalArray,setFinalArray] = useState([])
     
   const NextPAge=()=>{   
    setPaginationArrya(finalArray[pageNo-1])
    setPageNo(pageNo+1) 
  }

  
  useEffect(()=>{
    if(pages){
      setFinalArray(abc())
      console.log("abc=>",abc())
    }
  },[pages])

   useEffect(()=>{
     if(finalArray.length>=1){
      setPaginationArrya(finalArray[0])
     }
   },[finalArray])

  function abc(){
    let i = 1;
   let arr2 = [];
   let finalArray =[];
   let mod = pages%5
   let sub = pages-mod
   let m = 0
    
  while(m<2){
    if(i<=sub){
    while(i<=sub){
       arr2=[]
     for(let j=0;j<5;j++){
         arr2.push(i)
         i++
     }
     finalArray.push(arr2)
     
    }
  }
  else{
    if(mod){
      arr2=[]
        while(i<=pages){
          arr2.push(i)
          i++
        }
     finalArray.push(arr2)
    } 
  }
  m++
  }
  return finalArray
  } 

   
  const PreviousPAge = ()=>{
       if(pageNo>1){
        setPaginationArrya(finalArray[pageNo-2])  
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
    {
      PaginationArrya?.map((ele,index)=>(
        <li class="page-item"
         id={index+1}
         onClick={()=>{
          setPageView(index+1) }}
        >
        <a class="page-link" href="#"
        >
          {PaginationArrya[index]}
          </a>
          </li>
      ))
    }  
    <button class="page-link" id="next" onClick={NextPAge}>Next</button>
  </ul>
</nav> 
        </>
    )
}

export default Paginte;