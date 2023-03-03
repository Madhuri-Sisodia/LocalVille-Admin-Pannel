import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";

const Paginte = ()=>{

  const {setPageNo,pageNo} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([1,2,3])
   console.log(PaginationArrya)     


  const NextPAge=()=>{
    const arr = PaginationArrya
    setPageNo(pageNo+1)
    console.log(pageNo)
    arr[0] = pageNo
    arr[1] = pageNo+1
    arr[2]= pageNo+2
     setPaginationArrya(arr)
  }

   
  const PreviousPAge = ()=>{
    const arr = PaginationArrya
    if(pageNo>2){
      setPageNo(pageNo-1)
      arr[2] = pageNo
      arr[1] = pageNo-1
      arr[0]= pageNo-2
      setPaginationArrya(arr)
      
    }
  }


    return(
        <>
        <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item">
      <span class="page-link" onClick={PreviousPAge}>Previous</span>
    </li>
    <li class="page-item"><a class="page-link" href="#">{PaginationArrya[0]}</a></li>
    <li class="page-item">
      <span class="page-link">
      {PaginationArrya[1]}
      </span>
    </li>
    <li class="page-item"><a class="page-link" href="#">{PaginationArrya[2]}</a></li>
    <li class="page-item">
      <p class="page-link" onClick={NextPAge}>Next</p>
    </li>
  </ul>
</nav>  
        </>
    )
}

export default Paginte;