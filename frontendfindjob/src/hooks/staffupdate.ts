import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { IEmployer, IProduct, IStaff, IVacancy } from "../models"


export function useStaffUpdate(id: number)
{
  const [staff, setStaff] = useState<IStaff>()
  const [loading8, setLoading] = useState(false) 
  const [error8, setError] = useState('')
  
  async function fetchStaff() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IStaff>('https://localhost:7186/Staff/loadStaff/' + id)
      setStaff(response.data)
      setLoading(false)      
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError (error.message)

      
    }
    
  }



  useEffect(() =>{
fetchStaff()
  },[])

  return {staff, error8, loading8}
}