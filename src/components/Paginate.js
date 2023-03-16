import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";
import { useEffect } from "react";

const Paginte = ({pages})=>{

  const {setPageNo,pageNo,disalbledNext,setPageView} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([])
  const [finalArray,setFinalArray] = useState([])
     
   const NextPAge=()=>{ 
    console.log(pageNo)
    let len = finalArray.length
    if(pageNo>=len){
      const button = document.getElementById("next")
      button.setAttribute("disabled","")
      const butto1 = document.getElementById("next")
      butto1.setAttribute("disabled","")
    }
    else{
      const button = document.getElementById("previous")
        button.disabled = false
        setPageNo(pageNo+1) 
        setPaginationArrya(finalArray[pageNo])
        setPageView(finalArray[pageNo][0])
    }
  }

  
  useEffect(()=>{
    if(pages){
      setFinalArray(abc())
    }
  },[pages])

   useEffect(()=>{
     if(finalArray.length>=1){
      setPaginationArrya(finalArray[0])}
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
    console.log(pageNo)
     if((pageNo-1)==0){
      const button = document.getElementById("next")
      button.setAttribute("disabled","")
      const button1 = document.getElementById("next")
      button1.disabled = false
     }
     else{
      const button = document.getElementById("next")
      button.disabled = false
      console.log(pageNo)
      setPageNo(pageNo-1)
      setPaginationArrya(finalArray[pageNo-2])  
      setPageView(finalArray[pageNo-2][0]) 
     }
       
  }

    return(
        <>
        <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item">
      <button class="page-link" id="previous" onClick={PreviousPAge}>Previous</button>
    </li>
    {
      PaginationArrya?.map((ele,index)=>(
        <li class="page-item"
         id={index}
         onClick={()=>{
          setPageView(ele) 
        }}
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