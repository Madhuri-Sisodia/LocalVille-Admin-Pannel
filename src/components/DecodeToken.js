import jwt_decode from 'jwt-decode'
import { useEffect } from 'react'

const useDecode = ()=>{
   const token = sessionStorage.getItem("name")
   return token
}

export default useDecode;