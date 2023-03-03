import { useContext,useState } from "react";
import { Utils } from "CommonUtils/Utils";

const Paginte = ()=>{

  const {setPageNo,pageNo} = useContext(Utils)
  const [PaginationArrya,setPaginationArrya] = useState([1,2,3])
       
  const NextPAge=()=>{
    const arr = PaginationArrya
    arr.shift()
    console.log(arr)
    arr.push(pageNo+1)
    console.log(arr)
    setPaginationArrya(arr)
    setPageNo(pageNo+1)
  }

   
  const PreviousPAge = ()=>{
    const arr = PaginationArrya
    if(pageNo>1){
      arr.pop()
      arr.unshift(pageNo-1)
      setPaginationArrya(arr)
      setPageNo(pageNo-1)
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