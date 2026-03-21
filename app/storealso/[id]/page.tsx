"use client"
import StoreDesc from '@/app/dashboard/components/StoreDesc'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MapShowerAlso } from '../components/MapShpw'
import StoreListAlso from '../components/StoreListAlso'


const Storepage = () => {
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
    <div className="flex w-full gap-2">
      {/* <div className="max-w-6xl w-full">
        {store?.latitude && store?.longitude && (
          <MapShowerAlso
            lat={Number(store.latitude)}
            log={Number(store.longitude)}
          />
        )}
      </div> */}
      <StoreListAlso
        lat={Number(store.latitude)}
        log={Number(store.longitude)}
      />
    </div>

  );
}

export default Storepage