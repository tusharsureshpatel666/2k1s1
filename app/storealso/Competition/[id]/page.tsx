import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Compage = () => {
      const params = useParams()
      const id = params.id
      const [store, setStore] = useState({})
      useEffect(() => {
         const res = async() => {
          const data1 = await axios.post("/api/getstoreanybyid", {id})
          console.log(data1.data)
          setStore(data1.data)
          
         }
         res()
        
      }, [id])
  return (
    <div>page</div>
  )
}

export default Compage